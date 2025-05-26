const express = require('express');
const router = express.Router();
const Maintenance = require('../models/Maintenance');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const AppError = require('../utils/AppError');

// Protect all routes
router.use(protect);

// GET Requests by User ID
router.get('/user/:userId', authorizeRoles('admin', 'staff', 'resident'), async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (req.user.role === 'resident' && req.user.id !== userId) {
      return next(new AppError('Access denied: You can only view your own requests.', 403));
    }

    const requests = await Maintenance.find({ resident: userId })
      .populate('resident', 'username email')
      .populate('room', 'number type');

    res.status(200).json(requests);
  } catch (err) {
    next(new AppError(`Failed to fetch user maintenance requests: ${err.message}`, 500));
  }
});

// CREATE Maintenance Request
router.post('/', authorizeRoles('admin', 'staff', 'resident'), async (req, res, next) => {
  try {
    const { resident, room, description, status } = req.body;

    if (req.user.role === 'resident') {
      req.body.resident = req.user.id;
    }

    if (!req.body.resident || !room || !description) {
      return next(new AppError('Resident, room, and description are required.', 400));
    }

    const request = new Maintenance(req.body);
    const savedRequest = await request.save();
    res.status(201).json(savedRequest);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return next(new AppError(`Validation error: ${messages.join(', ')}`, 400));
    }
    next(new AppError(`Failed to create maintenance request: ${err.message}`, 400));
  }
});

// GET ALL Maintenance Requests
router.get('/', authorizeRoles('admin', 'staff', 'resident'), async (req, res, next) => {
  try {
    let query = {};
    if (req.user.role === 'resident') {
      query.resident = req.user.id;
    }
    const requests = await Maintenance.find(query)
      .populate('resident', 'username email')
      .populate('room', 'number type');
    res.status(200).json(requests);
  } catch (err) {
    next(new AppError(`Failed to fetch maintenance requests: ${err.message}`, 500));
  }
});

// GET ONE Maintenance Request
router.get('/:id', authorizeRoles('admin', 'staff', 'resident'), async (req, res, next) => {
  try {
    const request = await Maintenance.findById(req.params.id)
      .populate('resident', 'username email')
      .populate('room', 'number type');

    if (!request) {
      return next(new AppError('Request not found', 404));
    }

    if (req.user.role === 'resident' && request.resident._id.toString() !== req.user.id) {
      return next(new AppError('Access denied: You can only view your own requests.', 403));
    }

    res.status(200).json(request);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return next(new AppError('Invalid Request ID format.', 400));
    }
    next(new AppError(`Failed to fetch request: ${err.message}`, 500));
  }
});

// UPDATE Maintenance Request
router.put('/:id', authorizeRoles('admin', 'staff'), async (req, res, next) => {
  try {
    const { status, remarks } = req.body;
    const updateFields = { status, remarks };

    const updated = await Maintenance.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return next(new AppError('Request not found', 404));
    }

    res.status(200).json(updated);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return next(new AppError(`Validation error: ${messages.join(', ')}`, 400));
    }
    next(new AppError(`Failed to update request: ${err.message}`, 400));
  }
});

// DELETE Maintenance Request
router.delete('/:id', authorizeRoles('admin', 'staff'), async (req, res, next) => {
  try {
    const deleted = await Maintenance.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return next(new AppError('Request not found', 404));
    }

    res.status(200).json({ message: 'Request deleted successfully' });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return next(new AppError('Invalid Request ID format.', 400));
    }
    next(new AppError(`Failed to delete request: ${err.message}`, 500));
  }
});

module.exports = router;
