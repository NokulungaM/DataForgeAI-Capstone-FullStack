const mongoose = require("mongoose");

const mealSuggestionSchema = new mongoose.Schema({
  userIngredient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserIngredient",
    required: true,
  },
  suggestedMeal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Meal",
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
});

const MealSuggestion = mongoose.model("MealSuggestion", mealSuggestionSchema);
