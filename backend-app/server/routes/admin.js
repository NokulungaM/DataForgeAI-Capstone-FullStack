const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Middleware for authentication
const { getAllUsers, deleteUsers, deletePosts, getAllRecipes } = require('../controllers/adminController');
 const {registerUser, loginUser } = require('../controllers/userController');
const { validateSignUp, validateSignIn, signOut} = require('../controllers/authController');


// Route to login admin
router.post("/signup",validateSignUp, registerUser);

// Route to log a user in (signin)
router.post("/signin", validateSignIn, loginUser);

router.post("/signout", signOut)


// Admin-only route to get all users
router.get("/users",
  authMiddleware,
  getAllUsers);

router.get("/users/posts", authMiddleware, getAllRecipes)

// Admin-only route to delete a list of users
router.delete("/users/delete", authMiddleware, deleteUsers);

//Admin route to delete user Posts
router.delete("/users/posts/delete", authMiddleware, deletePosts);




module.exports = router;
