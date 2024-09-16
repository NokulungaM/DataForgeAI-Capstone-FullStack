const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../models/user');

// authMiddlewarefor registration
const validateUser = [
    check('userName', 'Username is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
];

const registerUser = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { userName, email, password } = req.body;

        // Check if user already exits
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists'});
        }

        // Salting
        const salt = await bcrypt.genSalt(10);

        // Hashing the password with salt
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user with the hashed password
        const user = new User({
            userName,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await user.save();

        res.status(201).json({ message: 'User registered successfully'});
     } catch (error) {
            res.status(500).json({ error: 'Internal server error'});
        }

    };

    module.exports = { registerUser };