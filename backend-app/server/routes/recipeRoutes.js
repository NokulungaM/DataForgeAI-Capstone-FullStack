const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const { fetchAndDisplayRecipes} = require('../controllers/recipeController');
const authMiddleware = require('../middleware/authMiddleware');

=======
const { fetchAndDisplayRecipes } = require('../controllers/recipeController');
const authMiddleware = require('../middleware/authMiddleware');
>>>>>>> 4691b9bd8e088ccf4f51b79fe40ecd3197b6aaa7

// Single route for fetching recipes
router.get('/recipes', authMiddleware, fetchAndDisplayRecipes);

module.exports = router;