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

  // Add a comment to a recipe
  exports.addComment = async (req, res) => {
    try {
      const { content } = req.body;
      const recipeId = req.params.recipeId;

      const recipe = await Recipe.findById(recipeId);
      if (!recipe) return res.status(404).json({ error: 'Recipe not found'});

      const comment = {
        user: req.user.id,
        content,
        isApproved: false,
      };

      recipe.comments.push(comment);
      await recipe.save();

      res.status(201).json({ message: 'Comment submitted for approval'});
    } catch (error) {
      res.status(500).json({ error: 'Server error'});
    }

    // Add or update a rating for a recipe
    exports.addRating = async (req, res) => {
      try {
        const { rating } = req.body;
        const recipeId = req.params.recipeId;

        // Find the recipe ny ID
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) return res.status(404).json({ error: 'Recipe not found'});

        // Check if the user has already rated the recipe
        const existingRating = recipe.ratings.find(r => r.user.toString() === req.user.id);

        // Update existing rating
        if (existingRating) {
          existingRating.rating = rating; 
        } else {
          recipe.ratings.push({ user:req.user.id,rating });
        }

        // Calculate average rating
        recipe.averageRating = recipe.ratings.reduce((acc, r) => acc + r.rating, 0) / recipe.ratings.length;

        // Save the updated recipe
        await recipe.save();

        res.status(201).json({ message: 'Rating added/updated', averageRating: recipe.averageRating});
      } catch (error) {
        res.status(500).json({ error: 'Server error'});
      }
    }
  }
};

module.exports = { fetchAndDisplayRecipes };
