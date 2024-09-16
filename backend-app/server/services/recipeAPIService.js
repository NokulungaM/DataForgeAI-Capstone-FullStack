const express = require('express');
const router = express.Router();
const axios = require('axios');
const Recipe = require('../models/Recipe'); // Ensure the correct model path

// Replace this with your actual Gemini API key
const geminiApiKey = 'AIzaSyDNcLk6T2OkECqSeTC6BOsePvOd7iwzHmU';

router.get('/', async (req, res) => {
  try {
    const ingredients = req.query.ingredients; // Get ingredients from query parameters
    const spoonacularApiKey = '7bcd45f0726d4d54a5a87190622eb0e1';

    if (!ingredients) {
      return res.status(400).json({ error: 'Ingredients query parameter is required' });
    }

    const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients`;

    // Make API request with ingredients and spoonacularApiKey
    const response = await axios.get(apiUrl, {
      params: {
        ingredients,
        number: 5, // Limit number of recipes to 5
        apiKey: spoonacularApiKey,
      },
    });

    const recipes = response.data; // The data is an array of recipes

    // Use Promise.all to handle async actions in parallel
    const recipePromises = recipes.map(async recipe => {
      try {
        const missedIngredients = recipe.missedIngredients.map(ingredient => ({
          id: ingredient.id,
          amount: ingredient.amount,
          unit: ingredient.unit || 'unknown',
          unitLong: ingredient.unitLong,
          unitShort: ingredient.unitShort,
          aisle: ingredient.aisle,
          name: ingredient.name,
          original: ingredient.original,
          originalName: ingredient.originalName,
          meta: ingredient.meta,
          extendedName: ingredient.extendedName,
          image: ingredient.image,
        }));

        const usedIngredients = recipe.usedIngredients.map(ingredient => ({
          id: ingredient.id,
          amount: ingredient.amount,
          unit: ingredient.unit || 'unknown',
          unitLong: ingredient.unitLong,
          unitShort: ingredient.unitShort,
          aisle: ingredient.aisle,
          name: ingredient.name,
          original: ingredient.original,
          originalName: ingredient.originalName,
          meta: ingredient.meta,
          extendedName: ingredient.extendedName,
          image: ingredient.image,
        }));

        const unusedIngredients = recipe.unusedIngredients ? recipe.unusedIngredients.map(ingredient => ({
          id: ingredient.id,
          amount: ingredient.amount,
          unit: ingredient.unit || 'unknown',
          unitLong: ingredient.unitLong,
          unitShort: ingredient.unitShort,
          aisle: ingredient.aisle,
          name: ingredient.name,
          original: ingredient.original,
          originalName: ingredient.originalName,
          meta: ingredient.meta,
          extendedName: ingredient.extendedName,
          image: ingredient.image,
        })) : [];

        // Save the recipe to MongoDB
        const newRecipe = new Recipe({
          id: recipe.id,
          title: recipe.title,
          image: recipe.image,
          imageType: recipe.imageType,
          usedIngredientCount: recipe.usedIngredientCount,
          missedIngredientCount: recipe.missedIngredientCount,
          missedIngredients,
          usedIngredients,
          unusedIngredients,
          likes: recipe.likes,
        });

        // Make a POST request to Gemini API to generate instructions
        const geminiResponse = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`,
          {
            contents: [
              {
                parts: [
                  {
                    text: `Generate cooking instructions for the recipe: ${recipe.title}.`
                  }
                ]
              }
            ]
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        
        // Log the full response to understand its structure
        console.log('Full Gemini API Response:', JSON.stringify(geminiResponse.data, null, 2));

        // Extract the content from the API response
        const contentParts = geminiResponse.data.candidates[0]?.content?.parts || [];
        const content = contentParts.map(part => part.text).join(' ');  // Combine the texts

        // Log the content to check if it's correctly accessed
        console.log('Extracted Content:', content);

        // Clean up the response
        function cleanResponse(text) {
          return text.replace(/\*\*/g, '').replace(/\n/g, ' ');
        }

        const cleanedResponse = cleanResponse(content);

        // Save instructions to the recipe object
        newRecipe.instructions = cleanedResponse;

        // Save each recipe to the database with instructions
        await newRecipe.save();
      } catch (error) {
        console.error('Error saving recipe:', error);
        // Handle error, maybe skip the problematic recipe
        return null; // Skip this recipe and continue with the rest
      }
    });

    // Wait for all recipes to be processed and stored
    await Promise.all(recipePromises);

    res.send('Recipes fetched and stored successfully with instructions from Gemini API');
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'An error occurred while fetching recipes' });
  }
});

module.exports = router;
