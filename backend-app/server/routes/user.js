const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to register a new user
router.post('/register', registerUser);

// Route to log a user in
router.post('/login', loginUser);


module.exports = router;
