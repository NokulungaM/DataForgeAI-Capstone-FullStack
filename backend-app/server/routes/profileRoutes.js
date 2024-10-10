
const { getUserProfile, updateUserProfile, getUserMealPlans, deleteMealPlan } = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');
const router = require('./recipeRoutes');


  

  // User Profile Routes
router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);

  // Meal Plan Management
router.get('/api/user/mealplans', authMiddleware, getUserMealPlans);
router.delete('/api/user/mealplans/:mealPlanId', authMiddleware, deleteMealPlan);



module.exports = router;
