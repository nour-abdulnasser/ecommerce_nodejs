process.on("uncaughtException", (err) => {
  console.log("***error in code***", err);
});
import express from "express";
import { bootstrap } from "./src/modules/bootstrap.js";
import { dbConnection } from "./database/db-connection.js";
import { ErrorClass } from "./src/utils/error-class.utils.js";
import { globalErrorHandler } from "./src/middleware/error-handling.middleware.js";

const app = express();
const port = 3000;

app.use(express.json());

bootstrap(app);

// error handling
app.use("*", (req, res, next) => {
  // res.status(404).json({message:`route not found ${req.originalUrl}`}) // the issue here is that we're sending an error to frontend without passing it through the global handler
  // next(new Error(`route not found ${req.originalUrl}`)) // the issue with this is we cant send the status code
  next(new ErrorClass(`route not found ${req.originalUrl}`, 404));
});
app.use(globalErrorHandler);
process.on("unhandledRejection", (err) => {
  console.log("error", err);
});
app.listen(port, () => console.log(`listening on port ${port}`));
