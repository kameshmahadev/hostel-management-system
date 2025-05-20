const express = require('express');
const router = express.Router();
const {
  createMaintenance,
  getAllMaintenance,
  updateMaintenance,
  deleteMaintenance
} = require('../controllers/maintenanceController');

const { protect } = require('../middleware/authMiddleware');

// Debug log for route hit confirmation
router.use((req, res, next) => {
  console.log(`[Maintenance] ${req.method} ${req.originalUrl}`);
  next();
});

router.post('/', protect, createMaintenance);
router.get('/', protect, getAllMaintenance);
router.put('/:id', protect, updateMaintenance);
router.delete('/:id', protect, deleteMaintenance);

module.exports = router;
