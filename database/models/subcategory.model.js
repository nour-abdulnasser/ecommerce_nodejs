import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true, // removes spaces at start and end
      required: [true, "Name is required."], // you can add custom messages for validation
      minLength: [2, "Name too short."],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, versionKey: false }
);

export const Subcategory = mongoose.model("SubCategory", schema); // dont forget to capitalize the name
