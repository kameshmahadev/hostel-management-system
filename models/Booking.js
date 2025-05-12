const mongoose = require('mongoose');
const Booking = require('../models/Booking');

const bookingSchema = new mongoose.Schema({
  resident: { type: mongoose.Schema.Types.ObjectId, ref: 'Resident', required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  status: { type: String, enum: ['Active', 'Completed', 'Cancelled'], default: 'Active' },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

const updateBooking = async (req, res) => {
  try {
    const { id } = req.params; // Extract booking ID from the request parameters
    const updates = req.body; // Extract updates from the request body

    // Find the booking by ID and update it
    const booking = await Booking.findByIdAndUpdate(id, updates, { new: true });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json(booking); // Return the updated booking
  } catch (error) {
    console.error('❌ Booking Update Error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = mongoose.model('Booking', bookingSchema);
module.exports.updateBooking = updateBooking;
