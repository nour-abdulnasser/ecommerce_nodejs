export const globalErrorHandler = (err, req, res, next) => {
    // res.json({message:"error"},err);
    // res.json({ message: "error from global handler" }, err.message);
  
    let code = err.statusCode || 500;
  
    res
      // .status(err.statusCode)
      .status(code)
      .json({
        error: "error from global handler",
        message: err.message,
        code: code,
        stack: err.stack, // for you, should be removed before production
      });
  };
  