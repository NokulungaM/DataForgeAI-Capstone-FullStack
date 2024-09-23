const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserIngredients, addUserIngredients, isAdmin } = require('../controllers/recipeController');
const authMiddleware = require('../middleware/authMiddleware');
const authController = require('../controllers/authController');



//Route to register new users
router.post('register', registerUser);

router.post('/signup', authController.signup);

//Route to log users in
router.post('/login', loginUser);

//Route to get user's ingredients
router.get('/ingredients', authMiddleware, getUserIngredients);

//Route to add ingredients for users
router.post('/ingredients', authMiddleware, addUserIngredients);

//Access control for admin
router.get('/admin-only', authMiddleware, (req, res) => {
    if(!req.isAdmin){
        return res.status(403).json({error: 'Access denied. Admin only.'})
    }
});
module.exports = router;


