import Router from "express";

import * as middleware from "../../middleware/index.js";

import * as controller from "../subcategory/subcategory.controller.js";
import { extensions } from "../../utils/file-extensions.utils.js";
import { Brand } from "../../../database/models/brand.model.js";

// "/brands" from bootstrap

const brandRouter = Router();

brandRouter
  .route("/")
  .post(
    middleware
      .multerHost({ allowedExtensions: extensions.Images })
      .single("image"),
    middleware.getDocumentByName(Brand),
    controller.addBrand,
    middleware.globalErrorHandler
  )
  .get(controller.getBrand, middleware.globalErrorHandler);
export default brandRouter;
