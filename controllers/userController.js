// backend/controllers/userController.js
const User = require('../models/User'); // Assuming your user model is named User
const AppError = require('../utils/AppError');

// Get all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password'); // Exclude passwords
    res.status(200).json(users);
  } catch (error) {
    next(new AppError('Failed to fetch users', 500));
  }
};

// Get user by ID
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return next(new AppError('User not found', 404));
    }
    res.status(200).json(user);
  } catch (error) {
    // Handle invalid ObjectId format
    if (error.kind === 'ObjectId') {
        return next(new AppError('Invalid User ID format.', 400));
    }
    next(new AppError(`Failed to fetch user: ${error.message}`, 500));
  }
};

// Update user
const updateUser = async (req, res, next) => {
  try {
    const { username, email, role } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    // Update user fields
    user.username = username || user.username;
    user.email = email || user.email;
    user.role = role || user.role;

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return next(new AppError(`Validation error: ${messages.join(', ')}`, 400));
    }
    if (error.code === 11000) { // Duplicate key error (e.g., email already exists)
      return next(new AppError('A user with this email already exists.', 400));
    }
    next(new AppError(`Failed to update user: ${error.message}`, 500));
  }
};

// Delete user
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    await user.deleteOne(); // Mongoose 5.x/6.x uses .deleteOne() for instance deletion
    res.status(200).json({ message: 'User removed' });
  } catch (error) {
    next(new AppError(`Failed to delete user: ${error.message}`, 500));
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};