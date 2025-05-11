// backend/routes/billRoutes.js

const express = require('express');
const router = express.Router();
const {
  createBill,
  getAllBills,
  getBillById,
  updateBill,
  deleteBill,
} = require('../controllers/billController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createBill);
router.get('/', protect, getAllBills);
router.get('/:id', protect, getBillById);
router.put('/:id', protect, updateBill);
router.delete('/:id', protect, deleteBill);

module.exports = router;
