import { Router } from "express";

import { globalErrorHandler } from "../../middleware/error-handling.middleware.js";
import {
  addCategory,
  deleteSingleCategory,
  // getAllCategories,
  getSingleCategory,
  updateSingleCategory,
} from "./category.controller.js";
import * as utils from "../../utils/index.js";
import * as middleware from "../../middleware/index.js";
import { getDocumentByName } from "../../middleware/finders.middleware.js";
import { Category } from "../../../database/models/category.model.js";

const categoryRouter = Router();

categoryRouter
  .route("/") // remember in bootstrap we use '/api/categories'. this is a continuation of that path
  .post(
    middleware
      .multerHost({ allowedExtensions: utils.extensions.Images })
      .single("image"),
    getDocumentByName(Category),
    addCategory,
    globalErrorHandler
  )
  // .get(getAllCategories)
  .get(getSingleCategory);
categoryRouter.route("/:id").delete(deleteSingleCategory, globalErrorHandler);
categoryRouter
  .route("/update/:_id")
  .put(
    middleware
      .multerHost({ allowedExtensions: utils.extensions.Images })
      .single("image"),
    middleware.getDocumentByName(Category),
    updateSingleCategory,
    globalErrorHandler
  );

export default categoryRouter;
