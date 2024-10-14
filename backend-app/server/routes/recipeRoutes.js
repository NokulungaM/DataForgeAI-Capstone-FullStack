const express = require('express');
const router = express.Router();
const { fetchAndDisplayRecipes} = require('../controllers/recipeController');
const authMiddleware = require('../middleware/authMiddleware');


// Single route for fetching recipes
router.get('/recipes', authMiddleware, fetchAndDisplayRecipes);

module.exports = router;