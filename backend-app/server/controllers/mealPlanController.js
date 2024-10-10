const axios = require('axios');
const User = require('../models/user');

// Replace with your actual API keys
const spoonacularApiKey = '7bcd45f0726d4d54a5a87190622eb0e1';
const geminiApiKey = 'AIzaSyDNcLk6T2OkECqSeTC6BOsePvOd7iwzHmU';

// Generate Meal Plan
exports.generateMealPlan = async (req, res) => {
  try {
    const { timeFrame, targetCalories, diet, exclude } = req.query;
    const userId = req.user._id; // Assuming the user ID is attached via auth middleware

    if (!targetCalories || !diet) {
      return res.status(400).json({ error: 'Please provide targetCalories and diet.' });
    }

    // Fetch meal plan from Spoonacular API
    const apiUrl = `https://api.spoonacular.com/mealplanner/generate`;
    const response = await axios.get(apiUrl, {
      params: {
        timeFrame: timeFrame || 'day',  // Default to 'day' if not provided
        targetCalories,
        diet,
        exclude,
        apiKey: spoonacularApiKey,
      },
    });

    const mealPlan = response.data;

    // Generate instructions for each meal using Gemini API
    const mealPromises = mealPlan.meals.map(async (meal) => {
      try {
        // Request Gemini to generate cooking instructions for the meal title
        const geminiResponse = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`,
          {
            contents: [
              {
                parts: [
                  { text: `Generate cooking instructions for the recipe: ${meal.title}.` }
                ]
              }
            ]
          },
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );

        // Extract and clean the instructions from the Gemini API response
        const contentParts = geminiResponse.data.candidates[0]?.content?.parts || [];
        const instructions = contentParts.map(part => part.text).join(' ') || 'No instructions available';
        const cleanedInstructions = instructions.replace(/\*\*/g, '').replace(/\n/g, ' ');

        // Return meal with instructions
        return {
          ...meal,
          instructions: cleanedInstructions,
        };
      } catch (error) {
        console.error(`Error generating instructions for meal: ${meal.title}`, error);
        return {
          ...meal,
          instructions: 'No instructions available',
        }; 
      }
    });

    // Wait for all meals to have their instructions generated
    const mealsWithInstructions = await Promise.all(mealPromises);

    // Add meal plan to the user's profile
    const user = await User.findById(userId);
    user.mealPlans.push({
      timeFrame,
      targetCalories,
      diet,
      exclude,
      meals: mealsWithInstructions,
    });

    await user.save();

    // Return the updated meal plan with instructions
    res.status(200).json({
      message: 'Meal plan generated and saved successfully!',
      mealPlan: mealsWithInstructions,
    });
  } catch (error) {
    console.error('Error generating meal plan:', error);
    res.status(500).json({ error: 'An error occurred while generating the meal plan.' });
  }
};
