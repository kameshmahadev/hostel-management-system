// backend/routes/maintenanceRoutes.js

const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const { createMaintenance, getAllMaintenance, updateMaintenance, deleteMaintenance } = require('../controllers/maintenanceController');
const { createUser } = require('../controllers/userController');

router.route('/')
  .get(protect, authorizeRoles('admin'), getAllMaintenance);

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

router.post(
  '/',
  [
    body('room').notEmpty().withMessage('Room is required'),
    body('description').notEmpty().withMessage('Description is required'),
    // Add more validations as needed
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createMaintenance
);

router.put(
  '/:id',
  [
    body('description').optional().notEmpty().withMessage('Description cannot be empty'),
    // Add more validations as needed
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  updateMaintenance
);

router.route('/:id')
  .delete(protect, authorizeRoles('admin'), deleteMaintenance);

module.exports = router;
