const mongoose = require('mongoose');
const Booking = require('../models/Booking');

exports.getAllBookings = async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
};

exports.createBooking = async (req, res) => {
  const newBooking = await Booking.create(req.body);
  res.status(201).json(newBooking);
};

exports.updateBooking = async (req, res) => {
  try {
    const { id } = req.params; // Extract booking ID from the request parameters
    const bookingId = String(id); // Ensure the ID is treated as a string
    console.log('🔍 Booking ID:', bookingId); // Log the booking ID for debugging

    // Check if the ID is a valid ObjectId
    const isValidObjectId = mongoose.Types.ObjectId.isValid(bookingId);
    console.log('✅ Is Valid ObjectId:', isValidObjectId); // Log the result of the validation

    if (!isValidObjectId) {
      return res.status(400).json({ message: 'Invalid booking ID format' });
    }

    const updates = req.body; // Extract updates from the request body

    // Find the booking by ID and update it
    const booking = await Booking.findByIdAndUpdate(bookingId, updates, { new: true });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json(booking); // Return the updated booking
  } catch (error) {
    console.error('❌ Booking Update Error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteBooking = async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.json({ message: 'Booking deleted' });
};

exports.getAllResidents = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const residents = await Resident.find().skip(skip).limit(limit);
  const total = await Resident.countDocuments();

  res.json({
    total,
    page,
    pages: Math.ceil(total / limit),
    residents
  });
};
