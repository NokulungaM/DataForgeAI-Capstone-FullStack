const express = require('express');
const router = express.Router();
const { generateMealPlan } = require('../controllers/mealPlanController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to generate meal plan based on diet and calories
router.get('/meal-plan',authMiddleware, generateMealPlan);

module.exports = router;
