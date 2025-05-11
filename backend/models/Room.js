const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  number: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  occupied: { type: Boolean, default: false },
  currentResident: { type: mongoose.Schema.Types.ObjectId, ref: 'Resident', default: null }
});

module.exports = mongoose.model('Room', roomSchema);
