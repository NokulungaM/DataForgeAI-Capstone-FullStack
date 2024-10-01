const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "admin"],
    default: "user",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  profilePicture: {
    type: String,
  },
  meals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Meal" }],
  Ingredients: [{ type: String }],
  postedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
  ratedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
  commentedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],

  tokenBlacklist: [{ type: String }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;