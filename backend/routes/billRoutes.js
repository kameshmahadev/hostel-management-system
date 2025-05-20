// routes/billRoutes.js
const express = require('express');
const router = express.Router();
const {
  createBill,
  getBills,
  getBillById,
  updateBill,
  deleteBill,
} = require('../controllers/billController');

const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createBill); // Admin/Staff only (optional: add role check)
router.get('/', protect, getBills);
router.get('/:id', protect, getBillById);
router.put('/:id', protect, updateBill);
router.delete('/:id', protect, deleteBill);

module.exports = router;
