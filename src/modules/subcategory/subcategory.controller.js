// Modules
import slugify from "slugify";
import { v4 as uuidv4 } from "uuid";

// Utils
import { cloudinaryConfig } from "../../utils/index.js";
import { ErrorClass } from "../../utils/error-class.utils.js";

import { SubCategory, Category } from "../../../database/models/index.js";

/**
 * @API {POST} Create Subcategory
 *
 * /subcategories
 */

export const addSingleSubCategory = async (req, res, next) => {
  const category = await Category.findById(req.query.categoryId);

  if (!category) {
    return next(
      new ErrorClass("Category not found.", 404, "Category not found.")
    );
  }

  if (!req.file) {
    return next(
      new ErrorClass("Please upload an image.", 400, "Please upload an image.")
    );
  }

  const { name } = req.body;

  //   const subcategory = SubCategory.
  // No need to check if name already exists because that's middleware we already made.

  //   if (name) {
  //     return next(
  //       new ErrorClass(
  //         "Subcategory name already exists.",
  //         400,
  //         "Subcategory name already exists."
  //       )
  //     );
  //   }

  const slug = slugify(name, {
    replacement: "_",
    lower: true,
  });

  const customId = uuidv4();

  const { secure_url, public_id } = await cloudinaryConfig().uploader.upload(
    req.file.path,
    {
      folder: `${process.env.UPLOADS_FOLDER}/Categories/${category.customId}/Subcategories/${customId}`,
    }
  );

  const categoryId = category._id;

  const subCategoryObject = {
    categoryId,
    images: {
      secure_url,
      public_id,
    },
    customId,
    name,
    slug,
  };

  const newSubCategory = await SubCategory.create(subCategoryObject);

  res.status(200).json({
    statusCode: 200,
    status: "success",
    message: "Subcategory created successfully.",
    data: newSubCategory,
  });
};

/**
 * @API {GET} Get Subcategory
 *
 */
export const getSubCategory = async (req, res, next) => {
  const { name, slug, id } = req.query;

  const queryFinder = {};

  if (name) queryFinder.name = name;
  if (slug) queryFinder.slug = slug;
  if (id) queryFinder._id = id; // careful what the object looks like (_id)

  const subcategory = await SubCategory.findOne(queryFinder);

  if (!subcategory) {
    return next(
      new ErrorClass("Subcategory not found.", 404, "Subcategory not found.")
    );
  }

  res.status(200).json({
    statusCode: 200,
    status: "success",
    message: "Subcategory successfully found.",
    data: subcategory,
  });
};

export const updateSubCategory = async (req, res, next) => {
  const { _id } = req.params;

  const subCategory = await SubCategory.findById(_id).populate("categoryId");

  if (!subCategory) {
    return next(
      new ErrorClass("Subcategory not found.", 404, "Subcategory not found.")
    );
  }

  // subCategory.populate(customId);

  const { name } = req.body;

  if (name) {
    const slug = slugify(name, {
      replacement: "_",
      lower: true,
    });

    subCategory.name = name;
    subCategory.slug = slug;
  }

  if (req.file) {
    const splittedPublicId = subCategory.images.public_id.split(
      `${subCategory.customId}/`
    )[1];

    const { secure_url } = await cloudinaryConfig().uploader.upload({
      file: req.file.path,
      folder: `${process.env.UPLOADS_FOLDER}/Categories/${subCategory.categoryId.customId}/Subcategories/${subCategory.customId}`,
      public_id: splittedPublicId,
    });

    subCategory.images.secure_url = secure_url;
  }

  await subCategory.save();

  res.status(200).json({
    status: "success",
    statusCode: 200,
    message: "SubCategory updated successfully.",
    data: subCategory,
  });
};

export const deleteSubCategory = async (req, res, next) => {
  const { _id } = req.params;

  const subCategory = await SubCategory.findByIdAndDelete(_id).populate("categoryId");

  if (!subCategory) {
    return next(
      new ErrorClass(
        "SubCategory does not exist.",
        404,
        "SubCategory does not exist."
      )
    );
  }

  const subCategoryPath = `${process.env.UPLOADS_FOLDER}/Categories/${subCategory.categoryId.customId}/Subcategories/${subCategory.customId}`;
  await cloudinaryConfig().api.delete_resources_by_prefix(subCategoryPath);
  await cloudinaryConfig().api.delete_folder(subCategoryPath);

  //TODO: delete relevant brands.
  // TODO: (note to self) don't delete from database unless image is deleted.

  res.status(200).json({
    status: "success",
    statusCode: 200,
    message: "Subcategory deleted successfully.",
    data: subCategory,
  });
};
