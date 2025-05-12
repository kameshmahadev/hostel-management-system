// routes/roomRoutes.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const {
  getAllRooms,
  createRoom,
  updateRoom
} = require('../controllers/roomController'); // ✅ Correct names now
const { createUser } = require('../controllers/userController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', getAllRooms);  // ✅ Works now

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
    body('roomNumber').optional().notEmpty().withMessage('Room number cannot be empty'),
    body('type').optional().notEmpty().withMessage('Room type cannot be empty'),
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
  updateRoom
);

module.exports = router;
