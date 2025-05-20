const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const {
  createRequest,
  getAllRequests,
  updateRequestStatus,
} = require('../controllers/maintenanceController');

// Create a new maintenance request (Authenticated users only)
router.post(
  '/',
  protect,
  authorizeRoles('admin', 'staff'),
  [
    body('resident').notEmpty().withMessage('Resident is required'),
    body('room').notEmpty().withMessage('Room is required'),
    body('issue').notEmpty().withMessage('Issue is required'),
    body('priority').notEmpty().withMessage('Priority is required'),
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

// Get all maintenance requests (Admin only)
router.get('/', protect, authorizeRoles('admin'), getAllRequests);

// Update maintenance request status (Admin only)
router.put('/:id/status', protect, authorizeRoles('admin'), updateRequestStatus);

module.exports = router;
