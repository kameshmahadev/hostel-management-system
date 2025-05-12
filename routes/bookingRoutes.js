const express = require('express');
const router = express.Router();
const {
  getAllBookings,
  createBooking,
  updateBooking,
  deleteBooking
} = require('../controllers/bookingController');

const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const { body, validationResult } = require('express-validator');
const { createUser } = require('../controllers/userController');

router.route('/')
  .get(protect, getAllBookings);

router.post(
  '/',
  [
    body('resident').notEmpty().withMessage('Resident is required'),
    body('room').notEmpty().withMessage('Room is required'),
    body('startDate').isISO8601().withMessage('Start date must be a valid date'),
    body('endDate').isISO8601().withMessage('End date must be a valid date'),
    // Add more validations as needed
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  protect,
  authorizeRoles('admin', 'staff'),
  createBooking
);

router.post(
  '/',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createUser // This must be a function!
);

router.put(
  '/:id',
  [
    body('startDate').optional().isISO8601().withMessage('Start date must be a valid date'),
    body('endDate').optional().isISO8601().withMessage('End date must be a valid date'),
    // Add more validations as needed
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  protect,
  authorizeRoles('admin'),
  updateBooking
);

router.delete('/:id', protect, authorizeRoles('admin'), deleteBooking);

module.exports = router;
