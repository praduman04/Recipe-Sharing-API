import mongoose from "mongoose";
const RecipeSchema = mongoose.Schema(
  {
    recipeName: {
      type: String,
      required: true,
    },
    cook: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
    },
    ingredients: {
      type: [String],
      required: true,
    },
    cookingInstructions: {
      type: [String],
      required: true,
    },
    photo: {
      type: [String],
      required: true,
    },
    cuisineType: {
      type: String,
      required: true,
      enum: ["Italian", "Mexican", "Indian", "Chinese", "American"],
    },
    dietaryPreference: {
      type: String,
      required: true,
      enum: ["Vegetarian", "Vegan", "Gluten-Free", "Non-Vegetarian"],
    },
    rating: {
      type: Number,
      default: 0,
      
      max: [5, "Rating cannot exceed 5"],
    },
    totalRating:{
      type:Number,
      default:0
    },
    feedbacks: {
      type: [String],
    },
    comments: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Comment",
    },
    shared: {
      type: Number,
      default: 0,
    },
    tag: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export const RecipeModel = mongoose.model("Recipe", RecipeSchema);
