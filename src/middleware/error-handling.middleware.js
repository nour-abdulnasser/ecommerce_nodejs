// import * as utils from "../utils/index.js";

// const { ErrorClass } = utils;

import { ErrorClass } from "../utils/index.js";


export function catchError(API) {
  return (req, res, next) => {
    API(req, res, next)?.catch((err) => {
      // res.json(err)
      next(
        new ErrorClass("Internal Server Error", 400, err.message, err.stack)
      ); // this assures going to the error handler when there is an error, not the ""next"" in line
    });
  };
}

export const globalErrorHandler = (err, req, res, next) => {
  // res.json({message:"error"},err);
  // res.json({ message: "error from global handler" }, err.message);
  if (err) {
    let code = err.statusCode || 500;
    res
      // .status(err.statusCode)
      .status(code)
      .json({
        message: "Error from global handler: Failed response.",
        err_message: err.message,
        err_location: err.location,
        err_code: code,
        err_stack: err.stack, // for you, should be removed before production
      });
  }
};
