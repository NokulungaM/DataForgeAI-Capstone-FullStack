const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  unitLong: {
    type: String,
  },
  unitShort: {
    type: String,
  },
  aisle: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  original: {
    type: String,
  },
  originalName: {
    type: String,
  },
  meta: {
    type: [String],
  },
  extendedName: {
    type: String,
  },
  image: {
    type: String,
  }
});

const recipeSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  imageType: {
    type: String,
  },
  usedIngredientCount: {
    type: Number,
  },
  missedIngredientCount: {
    type: Number,
  },
  missedIngredients: {
    type: [ingredientSchema],
  },
  usedIngredients: {
    type: [ingredientSchema],
  },
  unusedIngredients: {
    type: [ingredientSchema],
  },
  likes: {
    type: Number,
  },
  instructions: {
  type: [String],
  required: true,
  },
  ttsUrl: { type: String, default: null },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
