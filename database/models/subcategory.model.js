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
    images: {
      secure_url: {
        type: String,
        unique: true,
        required: true,
      },
      public_id: {
        required: true,
        type: String,
        unique: true,
      },
    },
    customId: {
      type: String,
      unique: true,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, versionKey: false }
);

export const SubCategory = mongoose.model("SubCategory", schema); // dont forget to capitalize the name
