const express = require('express');
const { body, validationResult } = require('express-validator');
const { createRequest, getAllRequests, updateRequestStatus } = require('../controllers/maintenanceController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post(
  '/',
  protect,
  [
    body('resident').notEmpty().withMessage('Resident is required'),
    body('room').notEmpty().withMessage('Room is required'),
    body('issue').notEmpty().withMessage('Issue is required'),
    body('priority').optional().isIn(['Low', 'Medium', 'High']).withMessage('Invalid priority')
  ],
  createRequest
);

router.get('/', protect, getAllRequests);
router.put('/:id', protect, updateRequestStatus);

module.exports = router;
