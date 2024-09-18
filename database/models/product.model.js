import mongoose, { Types } from "mongoose";

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
    description: {
      type: String,
      required: [true, "Product description required."],
      minLength: 30,
      maxLength: 2000,
    },
    price: {
      type: Number,
      required: true,
      min: 0, // min price value is 0
    },
    priceAfterDiscount: {
      type: Number,
      required: true,
      min: 0,
    },
    sold: Number,
    stock: {
      type: Number,
      min: 0,
    },
    category: {
      type: Types.ObjectId,
      ref: "Category",
    },
    subCategory: {
      type: Types.ObjectId,
      ref: "SubCategory",
    },
    brand: {
      type: Types.ObjectId,
      ref: "Brand",
    },
    rateAvg: {
      type: Number,
      min: 0,
      max: 5,
    },
    rateCount: Number,
    imageCover: String,
    images: [String],
  },
  { timestamps: true, versionKey: false }
);

export const Product = mongoose.model("Product", schema);
