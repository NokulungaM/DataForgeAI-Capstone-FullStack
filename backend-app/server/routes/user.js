const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getUserIngredients } = require("../controllers/userController");
const {  fetchAndDisplayRecipes } = require("../controllers/recipeController");
const authMiddleware = require('../middleware/authMiddleware');
const { validateSignUp , validateSignIn} = require('../controllers/authController');

// Route to sign up a new user
router.post('/signup', validateSignUp , registerUser);

// Route to log a user in (signin)
router.post('/signin', validateSignIn, loginUser);

// Route to get user's ingredients 
router.get('/ingredients', authMiddleware, getUserIngredients);

// Route to add ingredients for users
router.post("/addIngredients", authMiddleware, fetchAndDisplayRecipes);

module.exports = router;
