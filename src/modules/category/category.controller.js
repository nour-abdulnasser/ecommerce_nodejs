import slugify from "slugify";
import { v4 as uuidv4 } from "uuid";

import { ErrorClass } from "../../utils/error-class.utils.js";
import { Category } from "../../../database/models/category.model.js";

import { cloudinaryConfig } from "../../utils/index.js";

/**
 * @api {POST} Add single category
 */

const addCategory = async (req, res, next) => {
  // destructure the request body
  console.log("Body:", req.body);
  console.log("File:", req.file);
  const { name } = req.body;

  // check if name exists and is a string
  if (!name || typeof name != "string") {
    return next(
      new ErrorClass(
        `Category name is required and must be a string. Name:`,
        400,
        `Category name is required and must be a string. Name:`
      )
    );
  }

  const slug = slugify(name, {
    replacement: "_",
    lower: true,
  });

  // const categoryExists = await Category.findOne({ slug });
  // if (categoryExists){
  //   return next(new ErrorClass("Category already exists.", 400, "Category already exists." ))
  // }

  // images
  if (!req.file) {
    return next(
      new ErrorClass("Please upload an image.", 400, "Please upload an image.")
    );
  }

  const customId = uuidv4();

  const { secure_url, public_id } = await cloudinaryConfig().uploader.upload(
    req.file.path,
    {
      folder: `${process.env.UPLOADS_FOLDER}/Categories/${customId}`,
    }
  );

  // prepare category object
  const category = {
    name,
    slug,
    images: { secure_url, public_id },
    customId,
  };

  const newCategory = await Category.create(category);
  res.status(201).json({
    status: "success",
    message: "Category created successfully",
    data: newCategory,
  });
};

/**
 * @api {GET} get all categories
 */
// const getAllCategories = async (req, res, next) => {
//   let categories = await Category.find();
//   res.json({ message: "successfully found all categories.", categories });
// };

/**
 * @api {GET} Get single category (by name, id, or slug)
 */
const getSingleCategory = async (req, res, next) => {
  // Destructure queries from request
  const { id, name, slug } = req.query;

  // Prep query object
  let queryFinder = {};
  if (id) queryFinder.id = id;
  if (name) queryFinder.name = name;
  if (slug) queryFinder.slug = slug;

  // Find by query object
  let category = await Category.findOne(queryFinder);

  // Response
  res.json({ message: "successfully found single category.", category });
};

// const updateSingleCategory = async (req, res, next) => {
//   req.body.slug = slugify(req.body.name);
//   //   let category = await Category.findByIdAndUpdate(req.params.id, req.body, {
//   //     new: true,
//   //   });
//   let category = await Category.findByIdAndUpdate(req.params.id, req.body);
//   res.json({
//     message: "successfully found and updated single category.",
//     category,
//   });
// };

/**
 *
 * @API {PUT} /categories/update/:_id Update category
 */

const updateSingleCategory = async (req, res, next) => {
  // Check if the category exists by ID
  const { _id } = req.params;
  const { name } = req.body;
  const category = await Category.findById(_id);

  if (!category) {
    return next(
      new ErrorClass("Category not found", 404, "Category not found")
    );
  }

  // Update name and slug if name is provided
  if (name) {
    const slug = slugify(name, { replacement: "_", lower: true });
    category.name = name;
    category.slug = slug;
  }

  // Update the image if a new file is uploaded
  // Chatgpt: https://chatgpt.com/c/670fbe14-e8a4-800a-937c-b847a6a79fdb
  if (req.file) {
    const { public_id } = category.images;
    // const splitPublicId = category.images.public_id.split(`${category.customId}/`)[1]
    // Upload new image using the existing public_id to overwrite the old one
    const uploadResponse = await cloudinaryConfig().uploader.upload(
      req.file.path,
      {
        folder: `${process.env.UPLOADS_FOLDER}/Categories/${category.customId}`,
        public_id: public_id, // Keep the same public_id to overwrite the image
        overwrite: true,
      }
    );

    // Update category with the new secure_url from the Cloudinary response
    category.images.secure_url = uploadResponse.secure_url;
  }

  // Save updated category
  await category.save();

  res.status(200).json({
    status: "success",
    message: "Category updated successfully.",
    data: category,
  });
};

const deleteSingleCategory = async (req, res, next) => {
  const { _id } = req.params;
  let category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    return next(
      new ErrorClass(
        "Category already doesn't exist.",
        404,
        "Category already doesn't exist."
      )
    );
  }

  const categoryPath = `${process.env.UPLOADS_FOLDER}/Categories/${category.customId}`;

  await cloudinaryConfig().api.delete_resources_by_prefix(categoryPath);
  await cloudinaryConfig().api.delete_folder(categoryPath);

  //TODO: Delete relevant subcategories and brands.

  res.status(200).json({
    status: 200,
    message: "successfully found and deleted single category.",
    category,
  });
};

export {
  addCategory,
  // getAllCategories,
  getSingleCategory,
  deleteSingleCategory,
  updateSingleCategory,
};
