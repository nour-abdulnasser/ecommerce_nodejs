import slugify from "slugify";
import { v4 as uuidv4 } from "uuid";

import { Brand } from "../../../database/models/brand.model.js";
import { cloudinaryConfig, ErrorClass } from "../../utils/index.js";

/**
 *
 * @api {POST}  Create a new brand
 *
 * /brands
 *
 */
export const addBrand = async (req, res, next) => {
  // Not sure if we should check on category..
  const { _id, subCategoryId, categoryId } = req.query;
  const brand = await Brand.findById({ _id });

  if (brand) {
    return next(
      new ErrorClass("Brand already exists.", 400, "Brand already exists.")
    );
  }

  if (!req.file) {
    return next(
      new ErrorClass("Please upload an image.", 400, "Please upload an image.")
    );
  }

  const subCategory = await subCategory
    .findById({ _id: subCategoryId, categoryId })
    .populate("categoryId");

  if (!subCategory) {
    return next(
      new ErrorClass(
        "Subcategory does not exist. Please create the new subCategory first.",
        400,
        "Subcategory does not exist. Please create the new subCategory first."
      )
    );
  }

  const { name } = req.body;
  const slug = slugify(name, {
    replacement: "_",
    lower: true,
  });

  const customId = uuidv4();

  const { secure_url, public_id } = await cloudinaryConfig().uploader.upload({
    file: req.file.path,
    folder: `${process.env.UPLOADS_FOLDER}/Categories/${subCategory.categoryId.customId}/Subcategories/${subCategory.customId}/Brands/${customId}`,
  });

  const brandObject = {
    logo: {
      secure_url,
      public_id,
    },
    name,
    slug,
    categoryId: subCategory.categoryId._id,
    subCategoryId: subCategoryId._id,
    customId,
  };

  const newBrand = await Brand.create(brandObject);

  res.status(200).json({
    message: "Brand created successfully.",
    status: "success",
    statusCode: 200,
    data: newBrand,
  });
};

/**
 *
 * @api {GET}  get a single brand
 *
 * /brands
 *
 */
export const getBrand = async (req, res, next) => {
  const { id, name, slug } = req.query;
  const queryFilter = {}

  if(id) queryFilter._id = id
  if(name) queryFilter.name = name
  if(slug) queryFilter.slug = slug


  const brand = await Brand.findOne(queryFilter);

  if (!brand){
    return next(
        new ErrorClass("Brand not found.", 400, "Brand not found.")
      );
  }
  res.status(200).json({
    message: "Brand found successfully.",
    status: "success",
    statusCode: 200,
    data: brand,
  });
};


/**
 *
 * @api {GET}  get a single brand
 *
 * /brands
 *
 */

