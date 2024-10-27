const User = require("../models/user");
const userRecipes = require("../models/userRecipe");



// Get all users (admin function)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({error: error.message }); 
  }
};

// Delete a user (admin function)
const deleteUsers = async (req, res) => {
  const { userIds } = req.body; // Expecting an array of user IDs in the request body

  if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
    return res
      .status(400)
      .json({
        message: "Invalid request. Please provide an array of user IDs.",
      });
  }

  try {
    
    const result = await User.deleteMany({ _id: { $in: userIds } });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "No users found matching the provided IDs." });
    }

    res.status(200).json({
      message: `${result.deletedCount} user(s) deleted successfully.`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Error deleting users:", error);

    // Check for CastError (invalid ObjectId format)
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid user ID format." });
    }

    res.status(500).json({ error: error.message });
  }
};

const getAllRecipes = async (req, res) => {
    try {
        const recipes = await userRecipes.find({});
        res.status(200).json(recipes);
    } catch (error) {
        console.error("Error fetching recipes:", error);
        res.status(500).json({ error: error.message });
    }
};




const deletePosts = async (req, res) => {
    const { postIds } = req.body; // Expecting an array of post IDs in the request body
    
    if (!postIds || !Array.isArray(postIds) || postIds.length === 0) {
        return res
           .status(400)
           .json({
                message: "Invalid request. Please provide an array of post IDs.",
            });
    }
    
    try {
        
        const result = await userRecipes.deleteMany({ _id: { $in: postIds } });
        
        if (result.deletedCount === 0) {
            return res
                .status(404)
                .json({ message: "No posts found matching the provided IDs." });
        }

        res.status(200).json({
            message: `${result.deletedCount} post(s) deleted successfully.`,
            deletedCount: result.deletedCount,
        });
    } catch (error) {
        console.error("Error deleting posts:", error);
        
        // Check for CastError (invalid ObjectId format)
        if (error instanceof mongoose.Error.CastError) {
            return res.status(400).json({ message: "Invalid post ID format." });
        }
        
        res.status(500).json({ error: error.message });
    }




}

module.exports = {
    getAllUsers,
    getAllRecipes,
    deleteUsers,
    deletePosts
};
