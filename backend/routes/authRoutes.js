// backend/routes/authRoutes.js
const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { body, validationResult } = require('express-validator');
const AppError = require('../utils/AppError'); // Make sure AppError is accessible if needed here

const router = express.Router();

router.post(
  '/register',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Pass validation errors to global error handler
      return next(new AppError('Validation failed', 400, errors.array()));
    }
    // Pass control to controller, ensuring it can handle errors via next(err)
    registerUser(req, res, next);
  }
);

router.post('/login', loginUser); // Ensure loginUser also handles errors via next(err) or try/catch internally

module.exports = router;