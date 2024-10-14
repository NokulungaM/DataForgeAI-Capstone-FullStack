const Recipe = require('../models/Recipe');
const userRecipe = require('../models/userRecipe');
const Comment = require('../models/Comments')
const User = require('../models/user');
const mongoose = require('mongoose');
const { isValidObjectId } = mongoose;

const { fetchAndSaveRecipes } = require('../services/recipeAPIService');

// Controller to fetch and display recipes
const fetchAndDisplayRecipes = async (req, res) => {
  try {
    const ingredients = req.query.ingredients; // Get ingredients from query parameters

    if (!ingredients) {
      return res.status(400).json({ error: 'Ingredients query parameter is required' });
    }

    const ingredientsArray = ingredients.split(',').map(ingredient => ingredient.trim().toLowerCase());

    // Step 1: Check if relevant recipes are already in the database
    const existingRecipes = await Recipe.find({
      $or: [
        { 'usedIngredients.name': { $in: ingredientsArray } },
        { 'missedIngredients.name': { $in: ingredientsArray } }
      ]
    }, 'title image instructions').lean();

    if (existingRecipes.length > 0) {
      // If recipes exist in the database, return them
      return res.json(existingRecipes);
    }

    // Step 2: If not found in the database, fetch from the API, process with Gemini, save, and return
    const newRecipes = await fetchAndSaveRecipes(ingredients);
    return res.json(newRecipes);

  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'An error occurred while fetching recipes' });
  }
};

//Create a new recipe
const createRecipe = async (req, res) => {
  const { title, ingredients, instructions, recipeImage } = req.body;
  const recipe = new userRecipe({
    title,
    ingredients,
    instructions,
    recipeImage, 
    userId : req.user._id
  });
  try {
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Get all recipes
const getAllRecipes = async (req, res) => {
  try {

    const recipes = await userRecipe
      .find()
      .populate("userId", "username")
      .populate("likes", "userId")
      .populate("comments", "userId text");
    if (!recipes) return res.status(404).json({ message: "No recipes found" });
    res.json(recipes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single recipe by ID
const getOneRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await userRecipe.findById(id)
      .populate({
        path: "userId",
        select: "_id username", // Only retrieve user ID and username
      })
      .populate({
        path: "likes",
        select: "_id", // Only retrieve user ID for likes
      })
      .populate({
        path: "comments",
        populate: {
          path: "userId",
          select: "_id username", // Only retrieve user ID and username for comment authors
        },
      });

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(recipe);
  } catch (error) {
    console.error("Error getting recipe:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//update a comment 
const updateComment = async (req, res) => {
  const { id, commentId } = req.params;
  const { text } = req.body;

  // Input validation
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid recipe ID" });
  }
  if (!isValidObjectId(commentId)) {
    return res.status(400).json({ error: "Invalid comment ID" });
  }

  try {
    // Find recipe and check existence
    const recipe = await userRecipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    // Find comment and check existence
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Verify comment belongs to recipe
    if (!recipe.comments.includes(comment._id)) {
      return res
        .status(403)
        .json({ error: "Comment does not belong to recipe" });
    }

    // Update comment text
    comment.text = text;
    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
  
// Delete a comment from a recipe
const deleteComment = async (req, res) => {
  const { id, commentId } = req.params;

  // Input validation
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid recipe ID" });
  }
  if (!isValidObjectId(commentId)) {
    return res.status(400).json({ error: "Invalid comment ID" });
  }

  try {
    // Find recipe and check existence
    const recipe = await userRecipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    // Find comment and check existence
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Verify comment belongs to recipe
    if (!recipe.comments.includes(comment._id)) {
      return res
        .status(403)
        .json({ error: "Comment does not belong to recipe" });
    }

    // Verify comment owner
    if (!req.user._id.equals(comment.userId)) {
      return res.status(403).json({ error: "Unauthorized to delete comment" });
    }

    // Remove comment from recipe
    recipe.comments.pull(comment._id);
    await recipe.save();

    // Delete comment
    await comment.remove();

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
  
// Delete a recipe
const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  // Input validation
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid recipe ID" });
  }

  try {
    // Find recipe and check existence
    const recipe = await userRecipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    // Verify recipe ownership
    if (!req.user._id.equals(recipe.userId)) {
      return res.status(403).json({ error: "Unauthorized to delete recipe" });
    }

    // Remove comments associated with recipe
    await Comment.deleteMany({ recipeId: id });

    // Delete recipe
    await recipe.remove();

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Like a recipe 
const likeRecipe = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  // Input validation
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid recipe ID" });
  }
  if (!isValidObjectId(userId)) {
    return res.status(401).json({ error: "Invalid user ID" });
  }

  try {
    // Find recipe and check ownership
    const recipe = await userRecipe.findById(id);

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    // Prevent owners from liking their own recipes
    if (recipe.userId.equals(userId)) {
      return res.status(400).json({ error: "Cannot like your own recipe" });
    }

    // Toggle like
    const isLiked = recipe.likes.includes(userId);
    const update = isLiked
      ? { $pull: { likes: userId } }
      : { $addToSet: { likes: userId } };

    const updatedRecipe = await userRecipe.findByIdAndUpdate(id, update, {
      new: true,
    });

    const message = isLiked
      ? "Recipe unliked successfully"
      : "Recipe liked successfully";

    res.status(200).json({
      message,
      recipe: updatedRecipe,
    });
  } catch (error) {
    console.error("Error liking recipe:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Add a comment to a recipe
  const addComment = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const userId = req.user._id;

  // Input validation
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid recipe ID" });
  }
  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "Comment text is required" });
  }

  try {
    // Find recipe and check existence
    const recipe = await userRecipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    // Create new comment
    const comment = new Comment({
      text,
      userId,
      recipeId: id,
    });

    // Save comment and update recipe
    await comment.save();
    recipe.comments.push(comment._id);
    await recipe.save();

    // Return created comment with recipe and user details
    const populatedComment = await Comment.findById(comment._id)
      .populate("userId", "username")
      .populate("recipeId", "title");

    res.status(201).json(populatedComment);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


//Get Comments for a Recipe:

const getRecipeComments = async (req, res) => {
  const { id } = req.params;

  // Input validation
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid recipe ID" });
  }

  try {
    // Find recipe and check existence
    const recipe = await userRecipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    // Populate comments with user details
    const populatedComments = await Comment.find({ recipeId: id })
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(populatedComments);
  } catch (error) {
    console.error("Error getting comments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

 // Add or update a rating for a recipe
const addRating = async (req, res) => {
  try {
    const { rating } = req.body;
    const { id } = req.params;

        // Find the recipe ny ID
    const recipe = await userRecipe.findById(id);
      if (!recipe) return res.status(404).json({ error: "Recipe not found" });

      // Check if the user has already rated the recipe
      const existingRating = recipe.ratings.find(
          (r) => r.user.toString() === req.user._id
        );

        // Update existing rating
       if (existingRating) {
          existingRating.rating = rating;
        } else {
          recipe.ratings.push({ user: req.user._id, rating });
        }

        // Calculate average rating
        recipe.averageRating =
          recipe.ratings.reduce((acc, r) => acc + r.rating, 0) /
          recipe.ratings.length;

        // Save the updated recipe
        await recipe.save();

        res
          .status(201)
          .json({
            message: "Rating added/updated",
            averageRating: recipe.averageRating,
          });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  };

module.exports = {
  fetchAndDisplayRecipes,
  likeRecipe,
  addComment,
  getRecipeComments,
  addRating,
  createRecipe,
  getAllRecipes,
  getOneRecipe,
  updateComment,
  deleteComment,
  deleteRecipe
};
