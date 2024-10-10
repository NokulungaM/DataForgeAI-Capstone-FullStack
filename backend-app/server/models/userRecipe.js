const mongoose = require('mongoose');

const userRecipe = new mongoose.Schema({
  title: String,
  ingredients: [{ type: String }],
  instructions: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

const Recipe = mongoose.model("userRecipe", userRecipe);

module.exports = Recipe;