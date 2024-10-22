import slugify from "slugify";
import { ErrorClass } from "../utils/index.js";

/**
 *
 * @param {Class} model
 * @returns {Function}
 */
export const getDocumentByName = (model) => {
  return async (req, res, next) => {
    const { name } = req.body;
    if (name) {
      const slug = slugify(name, { replacement: "_", lower: true });
      const document = await model.findOne({ slug });
      if (document) {
        return next(
          new ErrorClass(
            `Category name: (${slug}) already exists.`,
            400, // Bad request
            `Category name: (${slug}) already exists.`
          )
        );
      }
      next();
    }
  };
};
// finder by unique slug: to give error if already exists. move on if not.
