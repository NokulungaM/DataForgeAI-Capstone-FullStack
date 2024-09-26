const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserIngredients, addUserIngredients } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to register a new user
router.post('/register', registerUser);

// Route to log a user in
router.post('/login', loginUser);

// Route to get user's ingredients 
router.get('/ingredients', authMiddleware, getUserIngredients);

// Route to add ingredients for users
router.post('/ingredients', authMiddleware, addUserIngredients);

module.exports = router;
