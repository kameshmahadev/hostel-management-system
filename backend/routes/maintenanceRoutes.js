const express = require('express');
const router = express.Router();
const {
  getAllBills,
  createBill,
  updateBill,
  deleteBill
} = require('../controllers/billController');

const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getAllBills)
  .post(protect, authorizeRoles('admin'), createBill);

router.route('/:id')
  .put(protect, authorizeRoles('admin'), updateBill)
  .delete(protect, authorizeRoles('admin'), deleteBill);

module.exports = router;
