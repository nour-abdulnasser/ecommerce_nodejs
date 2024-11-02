import Router from "express";

import * as middleware from "../../middleware/index.js";

import {
  addSingleSubCategory,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory
} from "../subcategory/subcategory.controller.js";
import { SubCategory } from "../../../database/models/index.js";
import { extensions } from "../../utils/file-extensions.utils.js";

const subCategoryRouter = Router();
const { multerHost, globalErrorHandler, getDocumentByName } = middleware;

subCategoryRouter.post(
  "/",
  multerHost({ allowedExtensions: extensions.Images }).single("image"),
  getDocumentByName(SubCategory),
  addSingleSubCategory,
  globalErrorHandler
);

subCategoryRouter.get(
  "/",
  // getDocumentByName(SubCategory), // This caused request timeout.
  getSubCategory,
  globalErrorHandler
);

subCategoryRouter.put(
  "/:_id",
  multerHost({ allowedExtensions: extensions.Images }).single("image"),
  getDocumentByName(SubCategory),
  updateSubCategory,
  globalErrorHandler
);
subCategoryRouter.delete("/:_id", deleteSubCategory, globalErrorHandler);


export default subCategoryRouter;
