const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Controllers from two files
const {
  getRooms,
  addRoom,
  updateRoom: updateRoomBasic,
  deleteRoom: deleteRoomBasic,
} = require('../controllers/roomController');

const {
  getAllRooms,
  createRoom,
  updateRoom,
  deleteRoom,
} = require('../controllers/roomController');

// Middleware
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

/* ------------------------------------
   Basic CRUD Routes (No Middleware)
------------------------------------ */

// Fetch all rooms - Unprotected
router.get('/basic', getRooms);

// Add a new room - Unprotected
router.post('/basic', addRoom);

// Update room details - Unprotected
router.put('/basic/:id', updateRoomBasic);

// Delete a room - Unprotected
router.delete('/basic/:id', deleteRoomBasic);

/* -----------------------------------------
   Protected and Validated Admin Routes
----------------------------------------- */

// Get all rooms (Protected or Public)
router.get('/', getAllRooms);

// Create a room (Protected, Admin only)
router.post(
  '/',
  protect,
  authorizeRoles('admin'),
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

// Update room (Protected, Admin only)
router.put(
  '/:id',
  protect,
  authorizeRoles('admin'),
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

// Delete room (Protected, Admin only)
router.delete('/:id', protect, authorizeRoles('admin'), deleteRoom);

module.exports = router;
