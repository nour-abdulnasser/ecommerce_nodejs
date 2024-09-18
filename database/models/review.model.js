import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: Types.ObjectId,
      ref: "Product",
      required: true,
    },
    comment: {
      type: String,
    },
    rate:{
        type: Number,
        min: 0,
        max: 5,
        required: true
    }
  },
  { timestamps: true, versionKey: false }
);

export const Review = mongoose.model("Review", schema);
