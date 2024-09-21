// import { Category } from "../../../database/models/category.model.js";
// import { ErrorClass } from "../../utils/error-class.utils.js";
// import {cloudinaryConfig} from "../../utils/index.js"
// import slugify from "slugify";
// // const addCategory = async (req, res, next) => {
// //   let category = new Category(req.body); // a new instance of Category, req.body is what we want to store
// //   console.log(category); // {name: "nour"}

// //   // you can make changes here before saving
// //   //   category.name = "noura";

// //   await category.save(); // document is saved
// //   console.log(category); // {name: "nour", createdAt: xxx}

// //   res.json({ message: "successfully saved one category.", category });
// // };

// const addCategory = async (req, res, next) => {
//   // destructure the request body
//   const { name } = req.body;

//   const slug = slugify(name, {
//     replacement: "_",
//     lower: true,
//   });

// // images
// if (!req.file){
//   return next(new ErrorClass("Please upload an image.",400, "Please upload an image." )  )
// }
// const data = await cloudinaryConfig().uploader.upload(req.file.path, {folder:`${process.env.UPLOADS_FOLDER}/Categories`})
// };

// const getAllCategories = async (req, res, next) => {
//   let categories = await Category.find();
//   res.json({ message: "successfully found all categories.", categories });
// };

// const getSingleCategory = async (req, res, next) => {
//   let category = await Category.findById(req.params.id);
//   res.json({ message: "successfully found single category.", category });
// };

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

// const deleteSingleCategory = async (req, res, next) => {
//   let category = await Category.findByIdAndDelete(req.params.id);
//   res.json({
//     message: "successfully found and deleted single category.",
//     category,
//   });
// };

// export {
//   addCategory,
//   getAllCategories,
//   getSingleCategory,
//   deleteSingleCategory,
//   updateSingleCategory,
// };
