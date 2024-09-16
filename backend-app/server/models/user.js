const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
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
  savedIngredients: [{ type: String }],
  postedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
  likedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
  commentedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
});

const User = mongoose.model("User", userSchema);
