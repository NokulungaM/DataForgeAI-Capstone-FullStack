const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Middleware for authentication
const { getAllUsers, deleteUser } = require('../controllers/adminController');
const {registerUser, loginUser } = require('../controllers/userController');


// Route to login admin
router.post("/signup", registerUser);

// Route to log a user in (signin)
router.post("/signin", loginUser);


// Admin-only route to get all users
router.get("/users",
  // authMiddleware,
  getAllUsers);

// Admin-only route to delete a user
router.delete("/users/:id", authMiddleware, deleteUser);


module.exports = router;
