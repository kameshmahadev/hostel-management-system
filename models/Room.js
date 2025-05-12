const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  number: {
    type: String,
    required: [true, 'Room number is required'], // Validation for 'number'
  },
  type: {
    type: String,
    required: [true, 'Room type is required'],
  },
  price: {
    type: Number,
    required: [true, 'Room price is required'],
  },
  occupied: {
    type: Boolean,
    default: false, // Default value is false
  },
  currentResident: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resident', // Reference to the Resident model
    default: null,
  },
});

module.exports = mongoose.model('Room', roomSchema);
