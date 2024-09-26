const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Middleware for authentication
const { getAllUsers, deleteUser } = require('../controllers/adminController');

// Admin-only route to get all users
router.get('/users', authMiddleware, (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ error: 'Access denied. Admin only.' });
    }
    getAllUsers(req, res);
});

// Admin-only route to delete a user
router.delete('/users/:id', authMiddleware, (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ error: 'Access denied. Admin only.' });
    }
    deleteUser(req, res);
});

module.exports = router;
