const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  resident: { type: mongoose.Schema.Types.ObjectId, ref: 'Resident' },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  from: Date,
  to: Date,
  status: { type: String, enum: ['Active', 'Completed', 'Cancelled'], default: 'Active' }
});

module.exports = mongoose.model('Booking', bookingSchema);
