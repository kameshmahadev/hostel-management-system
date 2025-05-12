// backend/routes/billRoutes.js

const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const { createBill, getAllBills, updateBill, deleteBill } = require('../controllers/billController');

router.route('/')
  .get(protect, getAllBills)
  .post(protect, authorizeRoles('admin'), createBill);

router.route('/:id')
  .put(protect, authorizeRoles('admin'), updateBill)
  .delete(protect, authorizeRoles('admin'), deleteBill);

module.exports = router;
