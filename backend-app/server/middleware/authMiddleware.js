const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
    try { 
        // Authorization header
        const token = req.header('Authorization').replace('Bearer' ,'');
        if (!token) {
            return res.status(401).json({ error: 'Access denied. No token provided'});
        }

        // Veryfy token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ error: 'Access denied. User not found'});
        }

        req.user = user;

        next();
} catch (error) {
    if (error.message === 'No token provided') {
        return res.status(401).json({ error: 'No token provided'});
    } else if (error.message === 'jwt malformed') {
        return res.status(401).json({ error: 'Invalid token'});
    } else if (error.message === 'Access denied. User not found') {
        return res.status(401).json({ error: 'Authentication failed'});
    }

    return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = authMiddleware;