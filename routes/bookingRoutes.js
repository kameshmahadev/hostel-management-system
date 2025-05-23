const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Room = require('../models/Room'); // Assuming Room model is correctly imported
const { protect, authorizeRoles } = require('../middleware/authMiddleware'); // Import authorizeRoles too
const AppError = require('../utils/AppError'); // Import AppError

router.use(protect); // Protect all routes in this router

// Create Booking
router.post('/', authorizeRoles('admin', 'staff', 'resident'), async (req, res, next) => { // Allow resident to create
  try {
    const { resident, room, startDate, endDate } = req.body;

    // Basic validation
    if (!resident || !room || !startDate || !endDate) {
      return next(new AppError('All booking fields (resident, room, startDate, endDate) are required.', 400));
    }
    if (new Date(startDate) >= new Date(endDate)) {
        return next(new AppError('End date must be after start date.', 400));
    }
    // Optional: Check if resident exists if not directly from req.user
    // const residentExists = await User.findById(resident); // Assuming Resident is a User
    // if (!residentExists) return next(new AppError('Resident not found.', 404));

    // Check for room availability and existing bookings
    const existingBookings = await Booking.find({
        room,
        $or: [
            { startDate: { $lt: new Date(endDate) }, endDate: { $gt: new Date(startDate) } }
        ]
    });

    if (existingBookings.length > 0) {
      return next(new AppError('Room is already booked for part or all of the requested period.', 400));
    }

    // Check if room exists and is available
    const targetRoom = await Room.findById(room);
    if (!targetRoom) {
        return next(new AppError('Room not found.', 404));
    }
    // You might want to allow booking even if status is 'occupied' if it's for a future date,
    // but the `existingBookings` check handles overlaps. If a room's status should prevent *any* new booking, check it here.
    // E.g., if (targetRoom.status === 'Under Maintenance') return next(new AppError('Room is under maintenance.', 400));


    const booking = new Booking({ resident, room, startDate, endDate });
    const saved = await booking.save();

    // Optionally update room status if this booking immediately occupies it
    // This logic might need refinement depending on your exact occupancy rules (e.g., if a room is 'occupied' only on check-in date)
    if (new Date(startDate) <= new Date()) { // If booking starts today or in past (meaning it's current)
        await Room.findByIdAndUpdate(room, { status: 'Occupied' });
    }

    res.status(201).json(saved);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return next(new AppError(`Validation error: ${messages.join(', ')}`, 400));
    }
    next(new AppError(`Failed to create booking: ${err.message}`, 500));
  }
});

// Get all Bookings
router.get('/', authorizeRoles('admin', 'staff'), async (req, res, next) => { // Only admin/staff can view all
  try {
    const bookings = await Booking.find()
      .populate('resident', 'username email')
      .populate('room', 'number type');
    res.status(200).json(bookings);
  } catch (err) {
    next(new AppError(`Failed to fetch bookings: ${err.message}`, 500));
  }
});

// Get one Booking by ID
router.get('/:id', authorizeRoles('admin', 'staff', 'resident'), async (req, res, next) => { // Allow resident to view their own booking
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('resident', 'username email')
      .populate('room', 'number type');
    if (!booking) {
      return next(new AppError('Booking not found', 404));
    }

    // Optional: For residents, ensure they can only view their own bookings
    if (req.user.role === 'resident' && booking.resident._id.toString() !== req.user.id) {
        return next(new AppError('Access denied: You can only view your own bookings.', 403));
    }

    res.status(200).json(booking);
  } catch (err) {
    if (err.kind === 'ObjectId') {
        return next(new AppError('Invalid Booking ID format.', 400));
    }
    next(new AppError(`Failed to fetch booking: ${err.message}`, 500));
  }
});

// Update Booking
router.put('/:id', authorizeRoles('admin', 'staff'), async (req, res, next) => {
  try {
    const { resident, room, startDate, endDate, status } = req.body; // Added status update
    const updateFields = { resident, room, startDate, endDate, status };

    // Check if end date is after start date if provided
    if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
        return next(new AppError('End date must be after start date.', 400));
    }

    const updated = await Booking.findByIdAndUpdate(req.params.id, updateFields, { new: true, runValidators: true });
    if (!updated) {
      return next(new AppError('Booking not found', 404));
    }
    res.status(200).json(updated);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return next(new AppError(`Validation error: ${messages.join(', ')}`, 400));
    }
    next(new AppError(`Failed to update booking: ${err.message}`, 500));
  }
});

// Delete Booking
router.delete('/:id', authorizeRoles('admin', 'staff'), async (req, res, next) => {
  try {
    const deleted = await Booking.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return next(new AppError('Booking not found', 404));
    }

    // Revert room status if it was occupied by this booking and no other active bookings for that room
    const activeBookingsForRoom = await Booking.countDocuments({
        room: deleted.room,
        endDate: { $gte: new Date() } // Count future/current bookings
    });

    if (activeBookingsForRoom === 0) {
        await Room.findByIdAndUpdate(deleted.room, { status: 'Available' });
    }

    res.status(200).json({ message: 'Booking cancelled' });
  } catch (err) {
    if (err.kind === 'ObjectId') {
        return next(new AppError('Invalid Booking ID format.', 400));
    }
    next(new AppError(`Failed to delete booking: ${err.message}`, 500));
  }
});

module.exports = router;