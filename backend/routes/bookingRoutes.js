const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Room = require('../models/Room');
const User = require('../models/User');

// Create a booking
router.post('/', async (req, res) => {
  try {
    const { resident, room, startDate, endDate } = req.body;

    // Check if room is already booked during that time
    const overlappingBooking = await Booking.findOne({
      room,
      $or: [
        { startDate: { $lte: endDate }, endDate: { $gte: startDate } }
      ]
    });

    if (overlappingBooking) {
      return res.status(400).json({ message: 'Room is already booked for the selected dates.' });
    }

    const booking = new Booking({ resident, room, startDate, endDate });
    const saved = await booking.save();

    // Update Room status
    await Room.findByIdAndUpdate(room, { occupied: true });

    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('resident', 'name email')
      .populate('room', 'number type');
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single booking
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('resident', 'name email')
      .populate('room', 'number type');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a booking
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Booking.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Booking not found' });

    // Optionally update room to unoccupied
    await Room.findByIdAndUpdate(deleted.room, { occupied: false });

    res.status(200).json({ message: 'Booking cancelled' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
