const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const {
  getAllRooms,
  createRoom,
  updateRoom,
  deleteRoom, // Added deleteRoom for completeness
} = require('../controllers/roomController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// Route to get all rooms (Public)
router.get('/', getAllRooms);

// Route to create a new room (Protected, Admin only)
router.post(
  '/',
  protect,
  authorizeRoles('admin'), // Only admins can create rooms
  [
    body('roomNumber').notEmpty().withMessage('Room number is required'),
    body('type').notEmpty().withMessage('Room type is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('status')
      .optional()
      .isIn(['Available', 'Occupied'])
      .withMessage('Status must be either "Available" or "Occupied"'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createRoom
);

// Route to update a room (Protected, Admin only)
router.put(
  '/:id',
  protect,
  authorizeRoles('admin'), // Only admins can update rooms
  [
    body('roomNumber').optional().notEmpty().withMessage('Room number cannot be empty'),
    body('type').optional().notEmpty().withMessage('Room type cannot be empty'),
    body('price').optional().isNumeric().withMessage('Price must be a number'),
    body('status')
      .optional()
      .isIn(['Available', 'Occupied'])
      .withMessage('Status must be either "Available" or "Occupied"'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  updateRoom
);

// Route to delete a room (Protected, Admin only)
router.delete('/:id', protect, authorizeRoles('admin'), deleteRoom);

module.exports = router;