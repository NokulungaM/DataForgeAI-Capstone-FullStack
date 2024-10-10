const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const  User  = require('../models/user');

// Register a new user
const registerUser = async (req, res) => {
    const { username, role, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, role, email, password: hashedPassword });
        await newUser.save();

        // Generate JWT token after saving the user
        const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, message: 'User registered ' });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Log a user in

const loginUser = async (req, res) => {
    const { username,  password } = req.body;

    try {
        // Find user by either username or email
        const user = await User.findOne({ username }) 

        if (!user) {
            return res.status(401).json({ message: 'Invalid user' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, isAdmin: user.role === 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, message: 'Login successful' });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: error.message });
    }
};




const getUserIngredients = async (req, res) => {
  try {
    // Assuming the user ID is accessible from the request object (e.g., req.user.id)
    const userId = req.user.id;

    // Find the user by ID and retrieve their ingredients
    const user = await User.findById(userId).select("Ingredients"); // Only fetch the 'ingredients' field

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.Ingredients);
  } catch (error) {
    console.error("Error fetching user ingredients:", error);
    res.status(500).json({ error: error.message });
  }
};
    




module.exports = {
    registerUser,
    loginUser,
    getUserIngredients
};
