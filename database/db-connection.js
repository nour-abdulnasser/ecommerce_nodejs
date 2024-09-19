import { connect } from "mongoose";

export const dbConnection = connect(
  "mongodb://localhost:27017/e-commerce"
).then(() => console.log("database connected"));
