// backend/routes/billRoutes.js

const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const { createBill, getAllBills, updateBill, deleteBill } = require('../controllers/billController');
const { createUser } = require('../controllers/userController');

router.route('/')
  .get(protect, getAllBills);

router.post(
  '/',
  [
    body('resident').notEmpty().withMessage('Resident is required'),
    body('amount').isNumeric().withMessage('Amount must be a number'),
    body('dueDate').isISO8601().withMessage('Due date must be a valid date'),
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
  createBill
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
    body('amount').optional().isNumeric().withMessage('Amount must be a number'),
    body('dueDate').optional().isISO8601().withMessage('Due date must be a valid date'),
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
  updateBill
);

router.route('/:id')
  .delete(protect, authorizeRoles('admin'), deleteBill);

module.exports = router;
