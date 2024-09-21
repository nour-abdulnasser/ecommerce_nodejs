import slugify from "slugify";
import { v4 as uuidv4 } from "uuid";

import { ErrorClass } from "../../utils/error-class.utils.js";
import { Category } from "../../../database/models/category.model.js";

import { cloudinaryConfig } from "../../utils/index.js";

// const addCategory = async (req, res, next) => {
//   let category = new Category(req.body); // a new instance of Category, req.body is what we want to store
//   console.log(category); // {name: "nour"}

//   // you can make changes here before saving
//   //   category.name = "noura";

//   await category.save(); // document is saved
//   console.log(category); // {name: "nour", createdAt: xxx}

//   res.json({ message: "successfully saved one category.", category });
// };


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
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

const getAllCategories = async (req, res, next) => {
  let categories = await Category.find();
  res.json({ message: "successfully found all categories.", categories });
};

const getSingleCategory = async (req, res, next) => {
  let category = await Category.findById(req.params.id);
  res.json({ message: "successfully found single category.", category });
};

const updateSingleCategory = async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  //   let category = await Category.findByIdAndUpdate(req.params.id, req.body, {
  //     new: true,
  //   });
  let category = await Category.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    message: "successfully found and updated single category.",
    category,
  });
};

const deleteSingleCategory = async (req, res, next) => {
  let category = await Category.findByIdAndDelete(req.params.id);
  res.json({
    message: "successfully found and deleted single category.",
    category,
  });
};

export {
  addCategory,
  getAllCategories,
  getSingleCategory,
  deleteSingleCategory,
  updateSingleCategory,
};
