const express = require('express');
const router = express.Router();
const Bill = require('../models/Bill');
const { protect, authorizeRoles } = require('../middleware/authMiddleware'); // Import authorizeRoles
const AppError = require('../utils/AppError'); // Import AppError

router.use(protect); // Protect all routes

// All bills (Admin/Staff can see all, Resident can see their own)
router.get('/', authorizeRoles('admin', 'staff', 'resident'), async (req, res, next) => {
  try {
    let query = {};
    if (req.user.role === 'resident') {
      query.resident = req.user.id; // Only fetch bills for the logged-in resident
    }
    const bills = await Bill.find(query).populate('resident', 'username email');
    res.status(200).json(bills);
  } catch (err) {
    next(new AppError(`Failed to fetch bills: ${err.message}`, 500));
  }
});

// One bill (Admin/Staff can see any, Resident can only see their own)
router.get('/:id', authorizeRoles('admin', 'staff', 'resident'), async (req, res, next) => {
  try {
    const bill = await Bill.findById(req.params.id).populate('resident', 'username email');
    if (!bill) {
      return next(new AppError('Bill not found', 404));
    }

    // If resident, ensure they are accessing their own bill
    if (req.user.role === 'resident' && bill.resident._id.toString() !== req.user.id) {
        return next(new AppError('Access denied: You can only view your own bills.', 403));
    }

    res.status(200).json(bill);
  } catch (err) {
    if (err.kind === 'ObjectId') {
        return next(new AppError('Invalid Bill ID format.', 400));
    }
    next(new AppError(`Failed to fetch bill: ${err.message}`, 500));
  }
});

// New bill (Admin/Staff only)
router.post('/', authorizeRoles('admin', 'staff'), async (req, res, next) => {
  try {
    const bill = new Bill(req.body);
    const saved = await bill.save();
    res.status(201).json(saved);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return next(new AppError(`Validation error: ${messages.join(', ')}`, 400));
    }
    next(new AppError(`Failed to create bill: ${err.message}`, 400));
  }
});

// Update Bill (Admin/Staff only)
router.put('/:id', authorizeRoles('admin', 'staff'), async (req, res, next) => {
  try {
    const updated = await Bill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) {
      return next(new AppError('Bill not found', 404));
    }
    res.status(200).json(updated);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return next(new AppError(`Validation error: ${messages.join(', ')}`, 400));
    }
    next(new AppError(`Failed to update bill: ${err.message}`, 400));
  }
});

// Delete Bill (Admin/Staff only)
router.delete('/:id', authorizeRoles('admin', 'staff'), async (req, res, next) => {
  try {
    const deleted = await Bill.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return next(new AppError('Bill not found', 404));
    }
    res.status(200).json({ message: 'Bill deleted successfully' });
  } catch (err) {
    if (err.kind === 'ObjectId') {
        return next(new AppError('Invalid Bill ID format.', 400));
    }
    next(new AppError(`Failed to delete bill: ${err.message}`, 500));
  }
});
module.exports = router;