// backend/routes/maintenanceRoutes.js

const express = require('express');
const router = express.Router();
const {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
} = require('../controllers/maintenanceController');
const { protect } = require('../middleware/authMiddleware');

// Routes
router.post('/', protect, createRequest);
router.get('/', protect, getAllRequests);
router.get('/:id', protect, getRequestById);
router.put('/:id', protect, updateRequest);
router.delete('/:id', protect, deleteRequest);

module.exports = router;
