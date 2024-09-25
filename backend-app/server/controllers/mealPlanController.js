const axios = require('axios');

// Replace with your actual Spoonacular API key
const spoonacularApiKey = '7bcd45f0726d4d54a5a87190622eb0e1';

exports.generateMealPlan = async (req, res) => {
  try {
    const { timeFrame, targetCalories, diet, exclude } = req.query;

    if (!targetCalories || !diet) {
      return res.status(400).json({ error: 'Please provide targetCalories and diet.' });
    }

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
    res.status(200).json(mealPlan); // Send the meal plan as the response
  } catch (error) {
    console.error('Error generating meal plan:', error);
    res.status(500).json({ error: 'An error occurred while generating the meal plan.' });
  }
};
