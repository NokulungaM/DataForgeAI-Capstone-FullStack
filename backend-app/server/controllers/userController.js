const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Register a new user
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword, isAdmin: false });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Log a user in
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



const getUserIngredients = async (req, res) => {
  try {
    // Assuming the user ID is accessible from the request object (e.g., req.user.id)
    const userId = req.user.id;

    // Find the user by ID and retrieve their ingredients
    const user = await User.findById(userId).select("ingredients"); // Only fetch the 'ingredients' field

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.ingredients);
  } catch (error) {
    console.error("Error fetching user ingredients:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
    




module.exports = {
    registerUser,
    loginUser,
    getUserIngredients
};