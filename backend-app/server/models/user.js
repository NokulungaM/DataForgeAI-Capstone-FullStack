const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
  name: {String,
  profilePicture: String,
  bio: String,
  location: String,
  },  
  meals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Meal" }],
  Ingredients: [{ type: String }],
  postedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "userRecipe" , required: true },],
  ratedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "userRecipe" }],
  commentedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "userRecipe" }],

tokenBlacklist: [{ type: String }],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;