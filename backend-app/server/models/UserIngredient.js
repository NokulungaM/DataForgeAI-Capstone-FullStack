const mongoose = require("mongoose");

const userIngredientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ingredients: [
    {
      type: String,
      required: true,
    },
  ],
  suggestedMeals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meal",
    },
  ],
});

const UserIngredient = mongoose.model("UserIngredient", userIngredientSchema);

module.exports = UserIngredient;
