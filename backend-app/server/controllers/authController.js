const User = require('../models/user');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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
    check('email').trim().isEmail().withMessage( 'Valid email is required'),
    check('password').isLength({ min: 6}).withMessage('Password must be at least 6 characters long'),
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
        console.error('Sign up error:, error');
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

        // Forgot Password
        exports.forgotPassword = async (req, res) => {
            const { email } = req.body;

            try {
                const user = await User.findOne({ email });
                if (!user) {
                    return res.status(404).json({ error: 'User with this email does not exist'});
                }

                // Generate a token
                const resetToken = crypto.randomBytes(20).toString('hex');

                // Set token and expiration on user model
                user.resetPasswordToken = resetToken;
                // Token expires in 1h
                user.resetPasswordExpires = Date.now() + 3600000

                await user.save();

                // Send the token via email
                const transporter = nodemailer.createTransport({
                    service: process.env.EMAIL_SERVICE,
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS,
                    },
                });

                const mailOptions = {
                    to: user.email,
                    from: process.env.EMAIL_USER,
                    subject: 'Password Reset Request',
                    text: `You are receiving this because you have requested a password reset for your account. \n\n
                            Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n
                            ${process.env.FRONTEND_URL}/reset-password/${resetToken}\n\n
                            If you did not request this, please ignore this email and your password will remain unchanged.\n`
                };

                await transporter.sendMail(mailOptions);

                res.status(200).json({ message: 'Password reset email sent successfully'});
            } catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
        };

        module.exports = {
            validateSignUp,
            validateSignIn,
            signUp: [validateSignUp, exports.signUp],
            signIn: [validateSignIn, exports.signIn],
            signOut: exports.signOut,
            forgotPassword: [authLimiter, exports.forgotPassword],
            resetPassword: [authLimiter, validateResetPassword, exports.resetPassword],
        };