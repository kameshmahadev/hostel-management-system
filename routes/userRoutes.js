// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController');
const AppError = require('../utils/AppError'); // Import AppError if controllers directly throw it

// Protect all routes in this router
router.use(protect);

// GET all users (admin/staff only)
// Wrap controller calls in a try-catch, or ensure controllers handle errors via next(err)
router.get('/', authorizeRoles('admin', 'staff'), (req, res, next) => getAllUsers(req, res, next));
// GET single user
router.get('/:id', (req, res, next) => getUserById(req, res, next));
// UPDATE user
router.put('/:id', authorizeRoles('admin'), (req, res, next) => updateUser(req, res, next));
// DELETE user
router.delete('/:id', authorizeRoles('admin'), (req, res, next) => deleteUser(req, res, next));

module.exports = router;