// controllers/recipeController.js

const Recipe = require('../models/Recipe');
const { fetchAndSaveRecipes } = require('../services/recipeAPIService');

// Controller to fetch and display recipes
const fetchAndDisplayRecipes = async (req, res) => {
  try {
    const ingredients = req.query.ingredients; // Get ingredients from query parameters

    if (!ingredients) {
      return res.status(400).json({ error: 'Ingredients query parameter is required' });
    }

    const ingredientsArray = ingredients.split(',').map(ingredient => ingredient.trim().toLowerCase());

    // Step 1: Check if relevant recipes are already in the database
    const existingRecipes = await Recipe.find({
      $or: [
        { 'usedIngredients.name': { $in: ingredientsArray } },
        { 'missedIngredients.name': { $in: ingredientsArray } }
      ]
    }, 'title image instructions').lean();

    if (existingRecipes.length > 0) {
      // If recipes exist in the database, return them
      return res.json(existingRecipes);
    }

    // Step 2: If not found in the database, fetch from the API, process with Gemini, save, and return
    const newRecipes = await fetchAndSaveRecipes(ingredients);
    return res.json(newRecipes);

  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'An error occurred while fetching recipes' });
  }
};

module.exports = { fetchAndDisplayRecipes };
