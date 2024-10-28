const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");


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

  // Fields for password reset functionality
  resetPasswordToken: String,
  resetPasswordExpires: Date,

  // Fields for email verification functionality
  verificationToken: String,
  verificationTokenExpires: Date,

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

// Method to generate password reset token
userSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash and set reset token in schema
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  // Set token expiration (e.g., 10 minutes)
  this.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  return resetToken;
};

// Method to generate email verification token
userSchema.methods.getVerificationToken = function () {
  // Generate token
  const verificationToken = crypto.randomBytes(20).toString('hex');

  // Hash and set verification token in schema
  this.verificationToken = crypto.createHash('sha256').update(verificationToken).digest('hex');

  // Set token expiration (e.g., 24 hours)
  this.verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

  return verificationToken;
};


const User = mongoose.model("User", userSchema);

module.exports = User;