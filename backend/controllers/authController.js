// backend/controllers/authController.js
const User = require('../models/User'); // Assuming your user model is named User
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

// Helper function to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Register User
const registerUser = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(new AppError('User already exists with that email', 400));
    }

    // Create new user
    const user = await User.create({ username, email, password, role });

    // If user created successfully, send response
    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      next(new AppError('Invalid user data', 400));
    }
  } catch (error) {
    next(new AppError(`Registration failed: ${error.message}`, 500));
  }
};

// Login User
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check for user and password
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      next(new AppError('Invalid email or password', 401));
    }
  } catch (error) {
    next(new AppError(`Login failed: ${error.message}`, 500));
  }
};

module.exports = {
  registerUser,
  loginUser,
};