const express = require('express');
const router = express.Router();
const ForgotPassword = require("../models/forgotPassword");
const { sendEmail } = require("../utils/sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { forgotPassword, resetPassword } = require("../controllers/authController");


//Route to forgot password
router.post("/forgot-password", forgotPassword);

//Route to reset password
router.put("/reset-password/:resetToken", resetPassword);


module.exports = router;


