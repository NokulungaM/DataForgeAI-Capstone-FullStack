// controllers/recipeController.js

const { fetchAndSaveRandomRecipes } = require('../services/recipeAPIService');

// Controller to fetch and display random recipes
const fetchAndDisplayRandomRecipes = async (req, res) => {
  try {
    // Fetch and save random recipes
    const randomRecipes = await fetchAndSaveRandomRecipes();

    // Return the fetched recipes to the client
    return res.json(randomRecipes);
  } catch (error) {
    console.error('Error fetching random recipes:', error);
    return res.status(500).json({ error: 'An error occurred while fetching random recipes' });
  }
};

module.exports = {fetchAndDisplayRandomRecipes};
