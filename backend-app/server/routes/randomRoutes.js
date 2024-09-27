
const express = require('express');
const router = express.Router();
const { fetchAndDisplayRandomRecipes} = require('../controllers/RandomRecipesController');

// Define the route to fetch random recipes
router.get('/recipes/random', fetchAndDisplayRandomRecipes);

module.exports = router;
