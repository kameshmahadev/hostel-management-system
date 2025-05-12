const mongoose = require('mongoose');

const residentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  emergencyContact: String,
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  checkInDate: Date,
  checkOutDate: Date
});

module.exports = mongoose.model('Resident', residentSchema);
