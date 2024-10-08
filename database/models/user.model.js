import {Schema, model, Types} from "mongoose";

const schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: String,
    password: String,
    isBlocked: { type: Boolean, default: false },
    isConfirmed: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, versionKey: false }
);

export const User = model("User", schema);
