process.on("uncaughtException", (err) => {
  console.log("***error in code***", err);
});
import express from "express";
import { bootstrap } from "./src/modules/bootstrap.js";
import { dbConnection } from "./database/dbConnection.js";
import { AppError } from "./src/utils/errorClass.utils.js";
import { globalErrorHandler } from "./src/middleware/errorHandling.middleware.js";

const app = express();
const port = 3000;

app.use(express.json());

bootstrap(app);

// error handling
app.use("*", (req, res, next) => {
  // res.status(404).json({message:`route not found ${req.originalUrl}`}) // the issue here is that we're sending an error to frontend without passing it through the global handler
  // next(new Error(`route not found ${req.originalUrl}`)) // the issue with this is we cant send the status code
  next(new AppError(`route not found ${req.originalUrl}`, 404));
});
app.use(globalErrorHandler);
process.on("unhandledRejection", (err) => {
  console.log("error", err);
});
app.listen(port, () => console.log(`listening on port ${port}`));
