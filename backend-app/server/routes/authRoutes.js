const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserIngredients, addUserIngredients, isAdmin } = require('../controllers/recipeController');
const authMiddleware = require('../middleware/authMiddleware');
const authController = require('../controllers/authController');
const User = require("../models/user");
const ForgotPassword = require("../models/forgotPassword");
const { sendEmail } = require("../utils/sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).send({ message: "User not found" })
    }

    //Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = Date.now() + 360000;

    await ForgotPassword.create({
        userId: user._id,
        resetToken,
        expiresAt
    });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}&id=${user._id}`
    await sendEmail({
        to: user.email,
        subject: "Password Reset",
        text: `Click the link to reset your password: ${resetUrl}`
    });

    res.status(200).send({ message: "Password reser email sent" });

};


const resetPassword = async (req, res) => {
    const { userId, resetToken, newPassword } = req.body;

    const passwordReset = await ForgotPassword.findOne({ userId, resetToken });

    if (!passwordReset || passwordReset.expiresAt < Date.now()) {
        return res.status(404).send({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(userId, { password: hashedPassword });

    await ForgotPassword.findByIdAndDelete(passwordReset._id);

    res.status(200).send({ message: "Password reset successful" });
    
};



//Route to register new users

//Route to forgot password
router.post("/forgot-password", forgotPassword);

//Route to reset password
router.post("/reset-password", resetPassword);


module.exports = router;


