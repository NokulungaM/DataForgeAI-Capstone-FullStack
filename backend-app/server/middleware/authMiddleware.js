const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = (role) => async (req, res, next) => {
    try {
      // Authorization header
      const token = req.header('Authorization').replace('Bearer ', '');
      if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.'   
   });
      }
  
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      // Fetch user based on the role
      const user = await User.findOne({ _id: decoded._id });
  
      if (!user) {
        return res.status(401).json({ error: 'Authentication failed' });
      }
  
      // Check if the user has the required role
      if (user.role !== role && role !== 'admin') {
        return res.status(403).json({ error: 'Access denied. Insufficient permissions' });
      }
  
      // Attach user to the request object
      req.user = user;
  
      // Route handler
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired' });
      } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'Invalid token'   
   });
      } else {
        return res.status(500).json({ error: 'Internal server error' });
      }
    }
  };
  
  module.exports   
   = authMiddleware;