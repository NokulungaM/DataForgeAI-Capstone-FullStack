// services/recipeAPIService.js

const axios = require('axios');
const Recipe = require('../models/Recipe'); // Ensure the correct model path

// Replace this with your actual Gemini API key
const geminiApiKey = 'AIzaSyDNcLk6T2OkECqSeTC6BOsePvOd7iwzHmU';
const spoonacularApiKey = '7bcd45f0726d4d54a5a87190622eb0e1';

// Function to fetch and save random recipes
const fetchAndSaveRandomRecipes = async () => {
  try {
    const apiUrl = `https://api.spoonacular.com/recipes/random`;
    
    // Fetch random recipes from Spoonacular API
    const response = await axios.get(apiUrl, {
      params: {
        number: 6, // Number of random recipes to fetch
        apiKey: spoonacularApiKey,
      },
    });

    const randomRecipes = response.data.recipes; // The data is an array of random recipes

    // Use Promise.all to handle async actions in parallel for each recipe
    const recipePromises = randomRecipes.map(async (recipe) => {
      try {
        // Save the random recipe to MongoDB without instructions for now
        const newRecipe = new Recipe({
          id: recipe.id,
          title: recipe.title,
          image: recipe.image,
        });

        // Generate instructions using Gemini API
        const geminiResponse = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`,
          {
            contents: [
              {
                parts: [
                  { text: `Generate cooking instructions for the recipe: ${recipe.title}.` }
                ]
              }
            ]
          },
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );

        // Extract instructions from Gemini API response
        const contentParts = geminiResponse.data.candidates[0]?.content?.parts || [];
        const instructions = contentParts.map(part => part.text).join(' ') || 'No instructions available';

        // Clean up the instructions
        const cleanedInstructions = instructions.replace(/\*\*/g, '').replace(/\n/g, ' ');

        // Add instructions to the recipe and save to MongoDB
        newRecipe.instructions = cleanedInstructions;
        await newRecipe.save();

        // Return only the relevant parts for the user
        return {
          title: recipe.title,
          image: recipe.image,
          instructions: cleanedInstructions
        };
      } catch (error) {
        console.error('Error processing random recipe:', error);
        return null;
      }
    });

    // Wait for all random recipes to be processed and saved
    const processedRecipes = await Promise.all(recipePromises);

    // Filter out any null recipes
    return processedRecipes.filter(recipe => recipe !== null);

  } catch (error) {
    console.error('Error fetching and processing random recipes:', error);
    throw new Error('An error occurred while fetching and processing random recipes');
  }
};

// Function to fetch recipes from the API, process them with Gemini, and save to the database
const fetchAndSaveRecipes = async (ingredients) => {
  try {
    const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients`;

    // Fetch recipes from Spoonacular API
    const response = await axios.get(apiUrl, {
      params: {
        ingredients,
        number: 5, // Limit number of recipes to 5
        apiKey: spoonacularApiKey,
      },
    });

    const recipes = response.data; // The data is an array of recipes

    // Use Promise.all to handle async actions in parallel
    const recipePromises = recipes.map(async (recipe) => {
      try {
        const missedIngredients = recipe.missedIngredients.map(ingredient => ({
          id: ingredient.id,
          amount: ingredient.amount,
          unit: ingredient.unit || 'unknown',
          aisle: ingredient.aisle,
          name: ingredient.name,
          original: ingredient.original,
        }));

        const usedIngredients = recipe.usedIngredients.map(ingredient => ({
          id: ingredient.id,
          amount: ingredient.amount,
          unit: ingredient.unit || 'unknown',
          aisle: ingredient.aisle,
          name: ingredient.name,
          original: ingredient.original,
        }));

        // Save the recipe to MongoDB without instructions for now
        const newRecipe = new Recipe({
          id: recipe.id,
          title: recipe.title,
          image: recipe.image,
          usedIngredients,
          missedIngredients,
        });

        // Generate instructions using Gemini API
        const geminiResponse = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`,
          {
            contents: [
              {
                parts: [
                  { text: `Generate cooking instructions for the recipe: ${recipe.title}.` }
                ]
              }
            ]
          },
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );

        // Extract instructions from Gemini API response
        const contentParts = geminiResponse.data.candidates[0]?.content?.parts || [];
        const instructions = contentParts.map(part => part.text).join(' ') || 'No instructions available';

        // Clean up the instructions
        const cleanedInstructions = instructions.replace(/\*\*/g, '').replace(/\n/g, ' ');

        // Add instructions to the recipe and save to MongoDB
        newRecipe.instructions = cleanedInstructions;
        await newRecipe.save();

        // Return only the relevant parts for the user
        return {
          title: recipe.title,
          image: recipe.image,
          instructions: cleanedInstructions
        };
      } catch (error) {
        console.error('Error processing recipe:', error);
        return null;
      }
    });

    // Wait for all recipes to be processed and saved
    const processedRecipes = await Promise.all(recipePromises);

    // Filter out any null recipes
    return processedRecipes.filter(recipe => recipe !== null);
  } catch (error) {
    console.error('Error fetching and processing recipes:', error);
    throw new Error('An error occurred while fetching and processing recipes');
  }
};

module.exports = { fetchAndSaveRecipes, fetchAndSaveRandomRecipes };
