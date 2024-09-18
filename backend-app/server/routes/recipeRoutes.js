// routes/recipeRoutes.js

const express = require('express');
const router = express.Router();
const { fetchAndDisplayRecipes } = require('../controllers/recipeController');

// Single route for fetching recipes
router.get('/recipes', fetchAndDisplayRecipes);

module.exports = router;