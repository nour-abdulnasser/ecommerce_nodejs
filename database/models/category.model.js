import mongoose from "mongoose";

const { Schema, model } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true, // removes spaces at start and end
      required: [true, "Name is required."], // you can add custom messages for validation
      minLength: [2, "Category name too short."],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },
    CreatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // To Do: Change to true after adding authentication
    },
    images: {
      secure_url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
        unique: true,
      },
    },
    customId: 
    // if you wanted to change category name,
    // you will need to also change it in the controller.
    // using an id instead unique to each each category is less of a hassle.
     {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export const Category =
  mongoose.model.Category || model("Category", categorySchema);
//  reuse an existing model if it’s already defined OR create it if not
// this line helps avoid errors due to defining a model multiple times when restarting the server
