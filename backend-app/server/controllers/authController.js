const User = require("../models/user");
const { validationResult, body } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// Auth middleware for registration
const validateSignUp = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long"),
  
  body("email").trim().isEmail().withMessage("Valid email is required"),
  
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[A-Z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/)
    .withMessage("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
];

// Validation middleware for sign-in
const validateSignIn = [
  body("email").trim().isEmail().withMessage("Valid email is required"),
  body("password").not().isEmpty().withMessage("Password is required"),
];

// User sign-up
exports.signUp = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, ...rest } = req.body;

    // Check for existing user with the same email
    const existingEmailUser = await User.findOne({ email });
    if (existingEmailUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Check for existing user with the same username
    const existingUsernameUser = await User.findOne({ username });
    if (existingUsernameUser) {
      return res.status(400).json({ error: "Username already in use" });
    }

    // Salt and Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      ...rest,
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set the cookie
    res.cookie("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.status(201).json({ token, message: "User registered successfully" });
  } catch (error) {
    console.error("Sign up error:", error);
    res.status(400).json({ error: "Failed to create user" });
  }
};

// User sign-in
exports.signIn = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    // Check if user exists
    const user = username
      ? await User.findOne({ username })
      : await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid login credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid login credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set the cookie
    res.cookie("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.status(200).json({ token, message: "Signed in successfully" });
  } catch (error) {
    console.error("Sign in error:", error);
    res.status(400).json({ error: "Sign in failed" });
  }
};

// Customer sign-out
exports.signOut = async (req, res) => {
  try {
    // Assuming you're using middleware to attach the user to the request
    const user = req.user;

    // Add the current token to a blacklist in the user document
    user.tokenBlacklist = user.tokenBlacklist || [];
    user.tokenBlacklist.push(req.token);

    // Optional: Remove old tokens from the blacklist (e.g., tokens older than 1 hour)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    user.tokenBlacklist = user.tokenBlacklist.filter(token => {
      const payload = jwt.decode(token);
      return payload.exp * 1000 > oneHourAgo.getTime();
    });

    await user.save();

    res.status(200).send("Signed out successfully");
  } catch (error) {
    res.status(500).json({ error: "Sign out failed" });
  }
};

// Validation middleware for resetting password
const validateResetPassword = [
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  body("confirmPassword").not().isEmpty().withMessage("Confirm password is required"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];

// Validation for forgot password
const validateForgotPassword = [
  body("email").trim().isEmail().withMessage("Valid email is required"),
];

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Checks if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate reset token
    const resetToken = user.getResetPasswordToken();

    // Save reset token and expiration to user in database
    await user.save({ validateBeforeSave: false });

    // Create reset URL
    const resetUrl = `${req.protocol}://${req
      .get("host")
      .replace(":3001", ":3000")}/account/resetPassword?token=${resetToken}`;

    // HTML message for email
    const message = `
      <h1>You have requested a password reset</h1>
      <p>Click the following link to reset your password:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    // Send email
    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        html: message,
      });

      res.status(200).json({
        message: `Email sent to ${user.email} successfully`,
      });
    } catch (error) {
      // Reset password fields in database if email fails
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save({ validateBeforeSave: false });

      return res
        .status(500)
        .json(error.message);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reset Password handler
exports.resetPassword = async (req, res) => {
  try {
    // Get reset token from URL
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.resetToken)
      .digest("hex");

    // Check if token is valid
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    // Save updated user
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  validateSignUp,
  validateSignIn,
  signUp: [validateSignUp, exports.signUp],
  signIn: [validateSignIn, exports.signIn],
  signOut: exports.signOut,
  validateResetPassword,
  validateForgotPassword,
  forgotPassword: [validateForgotPassword, exports.forgotPassword],
  resetPassword: [validateResetPassword, exports.resetPassword],
};
