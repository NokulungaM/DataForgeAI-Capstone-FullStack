const Recipe = require('../models/Recipe');
const userRecipe = require('../models/userRecipe');
const Comment = require('../models/Comments')
const User = require('../models/user');

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
  const { title, ingredients, instructions } = req.body;
  const recipe = new userRecipe({
    title,
    ingredients,
    instructions,
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
    const recipes = await userRecipe.find()
      .populate("userId")
      .populate("likes")
      .populate("comments");
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
      .populate("userId")
      .populate("likes")
      .populate("comments");
    if (!recipe) return res.status(404).json({ message: "Recipe not found" })
    res.json(recipe);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//update a comment 
  const updateComment = async (req, res) => {
    const { id } = req.params;
    const commentId = req.params.comment._id;
    const { text } = req.body;
    try {
      const recipe = await userRecipe.findById(id);
      if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
  
      const comment = recipe.comments.id(commentId);
      if (!comment) return res.status(404).json({ error: 'Comment not found' });
  
      comment.text = text;
      await recipe.save();
  
      res.status(200).json(comment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    };
};
  
// Delete a comment from a recipe
  const deleteComment = async (req, res) => {
    const { id } = req.params;
    const commentId = req.params.comment._id;
    try {
      const recipe = await userRecipe.findById(id);
      if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
  
      const comment = recipe.comments.id(commentId);
      if (!comment) return res.status(404).json({ error: 'Comment not found' });
  
      recipe.comments.pull(commentId);
      await recipe.save();
  
      res.status(200).json({ message: 'Comment deleted' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    };
};
  
// Delete a recipe
  const deleteRecipe = async (req, res) => {
    const { id } = req.params;
    try {
      const recipe = await userRecipe.findByIdAndDelete(id);
      if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
      res.status(204).json({ message: 'Recipe deleted' });
    } catch (error) {
      console.error("Error deleting recipe:", error);
      if (error.kind === 'ObjectId') {
        return res.status(400).json({ message: 'Invalid recipe ID' });
      }
      res.status(500).json({ error: error.message });
    }
  };

//Like a recipe 
const likeRecipe = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  try {
    const recipe = await userRecipe.findById(id);
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });

    // Check if user already liked the recipe
    if (recipe.likes.includes(userId)) {
      return res.status(400).json({ message: "You already liked this recipe" });
    }

    recipe.likes.push(userId);
    recipe.userId = userId; // Provide userId to satisfy validation
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add a comment to a recipe
  const addComment = async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    const userId = req.user_id;
    try {
      const recipe = await userRecipe.findById(id);
      if (!recipe) return res.status(404).json({ error: 'Recipe not found' });

      const comment = new Comment({
        text,
        userId,
        recipeId: id 
      });

      await comment.save();
  
      recipe.comments.push(comment.id);
      await recipe.save();

      res.status(201).json(comment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    };
   
}

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
  addRating,
  createRecipe,
  getAllRecipes,
  getOneRecipe,
  updateComment,
  deleteComment,
  deleteRecipe
};
