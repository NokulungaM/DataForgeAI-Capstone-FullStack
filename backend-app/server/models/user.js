const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt');



const userSchema = new Schema({
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

  mealPlans: [
    {
      timeFrame: String,
      targetCalories: Number,
      diet: String,
      exclude: String,
      meals: [
        {
          id: Number,
          title: String,
          imageType: String,
          readyInMinutes: Number,
          servings: Number,
          sourceUrl: String,
          instructions: String,
        },
      ],
      createdAt: { type: Date, default: Date.now },
    },
  ],
  name: {String,
  profilePicture: String,
  bio: String,
  location: String,
  },  
<<<<<<< HEAD
  meals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Meal" }],
  Ingredients: [{ type: String }],
  postedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
  ratedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
  commentedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
=======
  postedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "userRecipe", required: true },],
  ratedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "userRecipe" }],


tokenBlacklist: [{ type: String }],
>>>>>>> main
});

// userSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });

const User = mongoose.model("User", userSchema);

module.exports = User;