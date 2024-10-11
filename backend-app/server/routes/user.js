const express = require('express');
const router = express.Router();
const {
  validateSignUp,
  validateSignIn,
  signOut,
} = require("../controllers/authController");
const authMiddleware = require('../middleware/authMiddleware');
const {
    registerUser,
    loginUser,
    getUserIngredients } = require("../controllers/userController");
const {
  fetchAndDisplayRecipes,
  getAllRecipes,
  createRecipe,
  getOneRecipe,
  likeRecipe,
  addComment,
  updateComment,
  deleteComment,
  deleteRecipe,
  addRating,
} = require("../controllers/recipeController");



// Route to sign up a new user
router.post('/signup', validateSignUp , registerUser);

// Route to log a user in (signin)
router.post('/signin', validateSignIn, loginUser);

// Route to get user's ingredients 
router.get('/ingredients', authMiddleware, getUserIngredients);

// Route to add ingredients for users
router.post("/addIngredients", authMiddleware, fetchAndDisplayRecipes);



// Route to get all recipes
router.get("/all-recipes", authMiddleware, getAllRecipes);

//Create a new recipe
router.post("/user-recipes", authMiddleware, createRecipe);

// Get a single recipe by ID
router.get("/find-recipe/:id", authMiddleware, getOneRecipe);

// Like a recipe
router.patch("/recipes/:id/like", authMiddleware, likeRecipe);

// Add a comment to a recipe
router.patch("/recipe/:id/comment", authMiddleware, addComment);

// Update a comment in a recipe
router.patch(
  "/recipes/:id/comments/:commentId",
  authMiddleware,
  updateComment
);

// Delete a comment from a recipe
router.delete(
  "/recipes/:id/comments/:commentId",
  authMiddleware,
  deleteComment
);

// Delete a recipe by ID 
router.delete(
  "/recipes/:id, deleteRecipe",
  authMiddleware,
  deleteRecipe
);

//Add recipe rating
router.post("/recipes/:id/ratings", authMiddleware, addRating);

//User signOut
router.post("/signout", signOut)

module.exports = router;
