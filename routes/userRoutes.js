const express = require('express');
const router = express.Router();

const { register, login, createUser, updateUser } = require('../controllers/userController');
const { body, validationResult } = require('express-validator');

router.post('/register', register);
router.post('/login', login);

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
  createUser
);

router.put(
  '/:id',
  [
    body('username').optional().notEmpty().withMessage('Username cannot be empty'),
    body('email').optional().isEmail().withMessage('Valid email required'),
    // Add more validations as needed
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  updateUser
);

module.exports = router;
