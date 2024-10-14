const User = require('../models/user');
const { validationResult, body } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// authMiddleware for registration
const validateSignUp = [
    body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long'),

    body('email')
    .trim()
    .isEmail()
    .withMessage( 'Valid email is required'),

    body('password')
    .isLength({ min: 6})
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[A-Za-z])(?=.*|d)(?=.*[A-Z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
];

// Validation middleware for sign-in
const validateSignIn = [
    body('email')
    .trim()
    .isEmail()
    .withMessage('Valid email is required'),
    body('password')
    .not()
    .isEmpty()
    .withMessage('Password is required'),
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
        httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === "production", // Use HTTPS in production
        sameSite: "strict", // Prevent CSRF attacks
        maxAge: 1000 * 60 * 60 * 24, // Set cookie expiration (e.g., 1 day)
      });

      res.status(201).json({ token, message: "User registered successfully" });
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
             return res
               .status(400)
               .json({ error: "Invalid login credentials" });
           }

           // Compare passwords
           const isMatch = await bcrypt.compare(password, user.password);
           if (!isMatch) {
             return res
               .status(400)
               .json({ error: "Invalid login credentials" });
           }

           // Generate JWT token
           const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
             expiresIn: "1h",
           });

           // Set the cookie
           res.cookie("auth-token", token, {
             httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
             secure: process.env.NODE_ENV === "production", // Use HTTPS in production
             sameSite: "strict", // Prevent CSRF attacks
             maxAge: 1000 * 60 * 60 * 24, // Set cookie expiration (e.g., 1 day)
           });

           res.status(200).json({ token, message: "Signed in successfully" });
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