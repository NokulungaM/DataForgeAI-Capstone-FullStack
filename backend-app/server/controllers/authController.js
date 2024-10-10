const User = require('../models/user');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');

// Rate limiting middleware
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many authentication attempts, please try again after 15 minutes'
})

// authMiddleware for registration
const validateSignUp = [
    check('username').trim().isEmpty().withMessage('Username is required')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    check('email').trim().isEmail().withMessage('Valid email is required'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

// Validation middleware for sign-in
const validateSignIn = [
    check('email').trim().isEmail().withMessage('Valid email is required'),
    check('password').not().isEmpty().withMessage('Password is required'),
];

// Validation middleware for resetting password
const validateResetPassword = [
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
    check('confirmPassword', 'Confirm password is required').not().isEmpty(),
    check('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        return  true;
    })
];

// Validation for forgot password
const validateForgotPassword = [
    check("email").trim().isEmail().withMessage("Valid email is required"),
];

exports.forgotPassword = async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "No user found with this email" });
        }

        // Generate a reset token
        const resetToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS,
            },
        });

        // Get the base URL from the request (running host)
        const baseUrl = `${req.protocol}://${req.get('host')}`;

        // Create reset URL
        const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Password Reset",
            text: `You requested a password reset. Click the link to reset your password: ${resetUrl}`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Reset link sent to your email" });
    } catch (error) {
        console.error("Forgot password error:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

// Reset Password handler
exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        // Find user by reset token
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }, // Check if token is still valid
        });

        if (!user) {
            return res.status(400).json({ error: 'Password reset token is invalid or has expired' });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update user password and clear the reset token fields
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        // Automatically sign the user in by generating a JWT
        const token_ = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Respond with the token for automatic sign-in
        res.status(200).json({ token_, message: 'Password reset successful, signed in automatically' });

    } catch (error) {
        console.error('Reset Password Error:', error);
        res.status(500).json({ error: 'Failed to reset password' });
    }
};

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
            return res.status(400).json({ error: 'Email already in use' });
        }

        // Check for existing user with the same username
        const existingUsernameUser = await User.findOne({ username });
        if (existingUsernameUser) {
            return res.status(400).json({ error: 'Username already in use' });
        }

        // Salt and Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({
            username,
            email,
            password: hashedPassword,
            ...rest
        });

        await user.save();

        // Generate JWT token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, message: 'User registered successfully' });
    } catch (error) {
        console.error('Sign up error:', error);
        res.status(400).json({ error: 'Failed to create user' });
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
            return res.status(400).json({ error: 'Invalid login credentials' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid login credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, message: 'Signed in successfully' });
    } catch (error) {
        console.error('Sign in error:', error)
        res.status(400).json({ error: 'Sign in failed' });
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

            res.status(200).send('Signed out successfully');
            } catch (error) {
             res.status(500).json({ error: 'Sign out failed' });
            }
        };

        module.exports = {
            validateSignUp,
            validateSignIn,
            signUp: [validateSignUp, exports.signUp],
            signIn: [validateSignIn, exports.signIn],
            signOut: exports.signOut
        };