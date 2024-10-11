const mongoose = require('mongoose');
const User = require("./user");

const userRecipe = new mongoose.Schema({
  title: String,
  ingredients: [{ type: String }],
  instructions: String,
  recipeImage: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  dateCreated: { type: Date, default: Date.now }
});

const Recipe = mongoose.model("userRecipe", userRecipe);

module.exports = Recipe;