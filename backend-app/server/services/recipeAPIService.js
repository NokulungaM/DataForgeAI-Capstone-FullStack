const axios = require('axios');
const googleTTS = require('google-tts-api'); 
const Recipe = require('../models/Recipe'); 


const geminiApiKey = 'AIzaSyDNcLk6T2OkECqSeTC6BOsePvOd7iwzHmU';
const spoonacularApiKey = '7bcd45f0726d4d54a5a87190622eb0e1';

// Function to generate TTS URLs for long texts
const generateTTSUrls = (text) => {
  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    console.error('Invalid text input for TTS:', text);
    return null;
  }

  try {
    console.log('Generating TTS URLs for:', text); // Log the text being sent for TTS

    // Use getAllAudioUrls to handle long text
    const urls = googleTTS.getAllAudioUrls(text, {
      lang: 'en',
      slow: false,
      host: 'https://translate.google.com',
    });

    return urls; // Return array of TTS URLs
  } catch (error) {
    console.error('Error generating TTS URLs:', error);
    return null;
  }
};

// Function to fetch and save random recipes
const fetchAndSaveRandomRecipes = async () => {
  try {
    const apiUrl = 'https://api.spoonacular.com/recipes/random';
    
    // Fetch random recipes from Spoonacular API
    const response = await axios.get(apiUrl, {
      params: {
        number: 8, // Number of random recipes to fetch
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

        // Log the full response for debugging
        console.log('Gemini API Response:', geminiResponse.data);

        // Extract instructions from Gemini API response
        const contentParts = geminiResponse.data.candidates[0]?.content?.parts || [];
        const instructions = contentParts.map(part => part.text).join(' ') || 'No instructions available';

        // Clean up the instructions
        const cleanedInstructions = instructions
        .replace(/\*\*/g, '') // Remove double asterisks
        .replace(/\n/g, ' ') // Replace new lines with spaces
        .replace(/\"/g, '') // Remove escaped quotes
        .replace(/\\/g, '') // Remove any backslashes
        .replace(/\s{2,}/g, ' ') // Replace multiple spaces with a single space
        .replace(/\s\./g, '.') // Remove spaces before periods
        .replace(/\s\,/g, ',') // Remove spaces before commas
        .replace(/\s\:/g, ':') // Remove spaces before colons
        .replace(/\s*\*\s*/g, ' - ') // Replace bullet points (*) with dashes and proper spacing
        .replace(/^\s*-\s*/g, '') // Remove a leading bullet point if it exists at the start
        .replace(/\d\.\s/g, '\n$&') // Add a new line before numbered lists like "1. "
        .replace(/-\s/g, '\n- ') // Add a new line before dashes for bullet points
        .replace(/\.\s*/g, '.\n') // Add new line after every period to create readable sections
        .replace(/##/g, '')
        .trim(); // Trim leading/trailing spaces
        console.log('Cleaned Instructions:', cleanedInstructions); // Log cleaned instructions

        // Generate TTS URLs for the instructions
        const ttsUrls = generateTTSUrls(cleanedInstructions);
        console.log('Generated TTS URLs:', ttsUrls); // Log the generated TTS URLs

        // Handle TTS URLs (store all or just the first one, depending on your needs)
        newRecipe.ttsUrl = ttsUrls ? ttsUrls.map(urlObj => urlObj.url).join(', ') : null;

        // Add instructions and TTS URL to the recipe and save to MongoDB
        newRecipe.instructions = cleanedInstructions;
        await newRecipe.save();

        // Return only the relevant parts for the user
        return {
          title: recipe.title,
          image: recipe.image,
          instructions: cleanedInstructions,
          ttsUrl: newRecipe.ttsUrl, // Include TTS URLs in the returned data
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
    const apiUrl = 'https://api.spoonacular.com/recipes/findByIngredients';

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

        // Log the full response for debugging
        console.log('Gemini API Response:', geminiResponse.data);

        // Extract instructions from Gemini API response
        const contentParts = geminiResponse.data.candidates[0]?.content?.parts || [];
        const instructions = contentParts.map(part => part.text).join(' ') || 'No instructions available';

        // Clean up the instructions
       
        const cleanedInstructions = instructions
        .replace(/\*\*/g, '') // Remove double asterisks
        .replace(/\n/g, ' ') // Replace new lines with spaces
        .replace(/\"/g, '') // Remove escaped quotes
        .replace(/\\/g, '') // Remove any backslashes
        .replace(/\s{2,}/g, ' ') // Replace multiple spaces with a single space
        .replace(/\s\./g, '.') // Remove spaces before periods
        .replace(/\s\,/g, ',') // Remove spaces before commas
        .replace(/\s\:/g, ':') // Remove spaces before colons
        .replace(/\s*\*\s*/g, ' - ') // Replace bullet points (*) with dashes and proper spacing
        .replace(/^\s*-\s*/g, '') // Remove a leading bullet point if it exists at the start
        .replace(/\d\.\s/g, '\n$&') // Add a new line before numbered lists like "1. "
        .replace(/-\s/g, '\n- ') // Add a new line before dashes for bullet points
        .replace(/\.\s*/g, '.\n') // Add new line after every period to create readable sections
        .replace(/##/g, '')
        .trim(); // Trim leading/trailing spaces




        console.log('Cleaned Instructions:', cleanedInstructions); // Log cleaned instructions

        // Generate TTS URLs for the instructions
        const ttsUrls = generateTTSUrls(cleanedInstructions);
        console.log('Generated TTS URLs:', ttsUrls); // Log the generated TTS URLs

        // Handle TTS URLs (store all or just the first one, depending on your needs)
        newRecipe.ttsUrl = ttsUrls ? ttsUrls.map(urlObj => urlObj.url).join(', ') : null;

        // Add instructions and TTS URL to the recipe and save to MongoDB
        newRecipe.instructions = cleanedInstructions;
        await newRecipe.save();

        // Return only the relevant parts for the user
        return {
          title: recipe.title,
          image: recipe.image,
          instructions: cleanedInstructions,
          ttsUrl: newRecipe.ttsUrl, // Include TTS URLs in the returned data
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
