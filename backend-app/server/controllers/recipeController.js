// controllers/recipeController.js

const Recipe = require('../models/Recipe'); // Ensure the correct model path

// Function to get relevant recipes from MongoDB based on ingredients
const getRecipesByIngredients = async (req, res) => {
  try {
    const { ingredients } = req.query;

    // Ensure the ingredients query param exists
    if (!ingredients) {
      return res.status(400).json({ error: 'Ingredients query parameter is required' });
    }

    // Split the ingredients string into an array (assuming ingredients are comma-separated)
    const ingredientsArray = ingredients.split(',').map(ingredient => ingredient.trim().toLowerCase());

    // Find recipes in MongoDB where the usedIngredients or missedIngredients match any of the user's ingredients
    const recipes = await Recipe.find({
      $or: [
        { 'usedIngredients.name': { $in: ingredientsArray } },
        { 'missedIngredients.name': { $in: ingredientsArray } }
      ]
    }, 'title image instructions').lean(); // Only return title, image, and instructions

    if (!recipes.length) {
      return res.status(404).json({ error: 'No relevant recipes found for the given ingredients' });
    }

    res.json(recipes);
  } catch (error) {
    console.error('Error fetching relevant recipes:', error);
    res.status(500).json({ error: 'An error occurred while fetching relevant recipes' });
  }
};

module.exports = { getRecipesByIngredients };
