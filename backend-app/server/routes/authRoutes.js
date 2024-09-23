const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserIngredients, addUserIngredients, isAdmin } = require('../controllers/recipeController');
const authMiddleware = require('../middleware/authMiddleware');

//Route to register new users
router.post('register', registerUser);

//Route to log users in
router.post('/login', loginUser);

//Route to get user's ingredients
router.get('/ingredients', authMiddleware, getUserIngredients);

//Route to add ingredients for users
router.post('/ingredients', authMiddleware, addUserIngredients);

router.get('/admin-only', authMiddleware, (req, res) => {
    if(!req.isAdmin){

        return res.status(403).json({error: 'Access denied. Admin only.'})
    }
});

module.exports = router;