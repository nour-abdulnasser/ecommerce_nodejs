import categoryRouter from "./category/category.routes.js";
import subCategoryRouter from "./subcategory/subcategory.routes.js";
import brandRouter from "./brand/brand.routes.js";

export const bootstrap = (app) => {
  // app.use('/api/v1/categories')
  app.use("/api/categories", categoryRouter);
  app.use("/api/subcategories", subCategoryRouter);
  app.use("/api/brands", brandsRouter);
};
