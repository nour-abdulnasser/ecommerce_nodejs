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
    logo: String,
  },
  { timestamps: true, versionKey: false }
);

export const Brand = mongoose.model("Brand", schema);
