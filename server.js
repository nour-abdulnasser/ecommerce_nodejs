process.on("uncaughtException", (err) => {
  console.log("***error in code***", err);
});
import express from "express";
import dotenv from "dotenv";

import { dbConnection } from "./database/db-connection.js";
import * as router from "./src/modules/index.js";
import { bootstrap } from "./src/modules/bootstrap.js";
import { ErrorClass } from "./src/utils/error-class.utils.js";
import { globalErrorHandler } from "./src/middleware/error-handling.middleware.js";

const app = express();
const port = 3000;

dotenv.config();
app.use(express.json());
bootstrap(app);


app.use("*", (req, res, next) => {
  next(new ErrorClass(`route not found ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);
process.on("unhandledRejection", (err) => {
  console.log("error", err);
});


app.listen(port, () => console.log(`listening on port ${port}`));
