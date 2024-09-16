// routes/recipeRoutes.js

const express = require('express');
const router = express.Router();
const { getRecipesByIngredients } = require('../controllers/recipeController'); // Adjust path as needed

// Route to get the relevant recipes based on the saved recipes in MongoDB
router.get('/recipes', getRecipesByIngredients);

module.exports = router;