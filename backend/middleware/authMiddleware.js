// backend/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to check if the user is authenticated
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log('🔑 Token received:', token);

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('✅ Token decoded:', decoded);

      req.user = await User.findById(decoded.id).select('-password');
      console.log('👤 Authenticated user:', req.user);

      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      next();
    } catch (error) {
      console.error('❌ JWT Error:', error.message);
      if (error.message === 'invalid signature') {
        return res.status(401).json({ message: 'Invalid token signature' });
      }
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// ✅ Middleware to restrict by role
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      console.log('❌ Access denied: insufficient permissions'); // Log insufficient permissions
      return res.status(403).json({ message: 'Access denied: insufficient permissions' });
    }
    next();
  };
};

// ✅ Export both
module.exports = {
  protect,
  authorizeRoles
};