const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
<<<<<<< HEAD
  id: {
    type: Number,
    required: true,
  },

=======
  // id: {
  //   type: Number,
  //   required: true,
  // },
>>>>>>> main
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
  // id: {
  //   type: Number,
  //   required: true,
  // },
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
  instructions: {
  type: [String],
  required: true,
  },
<<<<<<< HEAD
  ttsUrl: { type: String, default: null },
=======
  // userId : {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true,
  // },
  // likes : [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  // }],
  // comments : [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Comment',
  // }] 
>>>>>>> main
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
