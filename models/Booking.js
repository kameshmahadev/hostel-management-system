// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  resident: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, default: 'Booked' }, // or Pending, Cancelled, etc.
}, {
  timestamps: true,
});

module.exports = mongoose.model('Booking', bookingSchema);
