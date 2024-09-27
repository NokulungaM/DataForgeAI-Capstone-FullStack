const express = require('express');
const router = express.Router();
const { generateMealPlan } = require('../controllers/mealPlanController');

// Route to generate meal plan based on diet and calories
router.get('/meal-plan', generateMealPlan);

module.exports = router;
