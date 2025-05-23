// routes/residentRoutes.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const {
  getAllResidents,
  getResident,
  createResident,
  updateResident,
  deleteResident
} = require('../controllers/residentController');

const { createUser } = require('../controllers/userController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// All routes below this require login
router.use(protect);

// GET all residents
router.get('/', getAllResidents);

// POST create resident & user (admin only)
router.post(
  '/',
  authorizeRoles('admin'),
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('name').notEmpty().withMessage('Name is required'),
    body('phone').notEmpty().withMessage('Phone is required'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  async (req, res, next) => {
    try {
      await createUser(req, res, next); // Creates user
      await createResident(req, res);   // Then creates resident
    } catch (err) {
      next(err);
    }
  }
);

// GET one resident
router.get('/:id', getResident);

// UPDATE
router.put(
  '/:id',
  authorizeRoles('admin'),
  [
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('email').optional().isEmail().withMessage('Valid email required'),
    body('phone').optional().notEmpty().withMessage('Phone cannot be empty'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  updateResident
);

// DELETE
router.delete('/:id', authorizeRoles('admin'), deleteResident);

module.exports = router;
