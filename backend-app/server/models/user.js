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

  profilePicture: {
    type: String,
    default:
      "https://t4.ftcdn.net/jpg/04/83/90/95/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg",
  },

  bio: {
    type: String,
    default: "A user with no bio",
  },

  location: {
    type: String,
    default: "No location provided",
  },

  meals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Meal" }],
  Ingredients: [{ type: String }],
  postedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
  ratedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
  commentedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
});

// userSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });

const User = mongoose.model("User", userSchema);

module.exports = User;