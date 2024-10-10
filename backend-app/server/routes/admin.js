const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Middleware for authentication
const { getAllUsers, deleteUser } = require('../controllers/adminController');
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

// Admin-only route to delete a user
router.delete("/users/:id", authMiddleware, deleteUser);


module.exports = router;
