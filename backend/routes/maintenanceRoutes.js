// backend/routes/maintenanceRoutes.js

const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const { createMaintenance, getAllMaintenance, updateMaintenance, deleteMaintenance } = require('../controllers/maintenanceController');

router.route('/')
  .get(protect, authorizeRoles('admin'), getAllMaintenance)
  .post(protect, authorizeRoles('admin', 'user'), createMaintenance);

router.route('/:id')
  .put(protect, authorizeRoles('admin'), updateMaintenance)
  .delete(protect, authorizeRoles('admin'), deleteMaintenance);

module.exports = router;
