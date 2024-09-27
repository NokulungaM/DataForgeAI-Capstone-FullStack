const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
  },
  ingredients: [
    {
      type: String,
      required: true,
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  suggestedFor: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserIngredient",
    },
  ],
  cookingTime: {
    type: Number,
  },
  cookingInstructions: [
    {
      type: String,
    },
  ],
});

const Meal = mongoose.model("Meal", mealSchema);
