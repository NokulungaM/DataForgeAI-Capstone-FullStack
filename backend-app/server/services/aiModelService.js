const express = require('express');
const router = express.Router();
const axios = require('axios');
const Recipe = require('../models/Recipe'); // Ensure the correct model path

router.get('/', async (req, res) => {
  try {
    const ingredients = req.query.ingredients; // Get ingredients from query parameters
    const apiKey = '7bcd45f0726d4d54a5a87190622eb0e1';
    
    if (!ingredients) {
      return res.status(400).json({ error: 'Ingredients query parameter is required' });
    }

    const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients`;
    
    // Make API request with ingredients and apiKey
    const response = await axios.get(apiUrl, {
      params: {
        ingredients,
        number: 5, // Limit number of recipes to 5
        apiKey: apiKey,
      },
    });

    const recipes = response.data; // The data is an array of recipes

    // Save each recipe to the MongoDB Atlas database
    for (let recipe of recipes) {
      const newRecipe = new Recipe({
        title: recipe.title,
        image: recipe.image,
        id: recipe.id,
        // You can add more fields depending on what you want to save
      });
      await newRecipe.save();
    }

    res.send('Recipes fetched and stored successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching recipes');
  }
});

module.exports = router;
