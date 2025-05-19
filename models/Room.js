const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  number: {
    type: String,
    required: [true, 'Room number is required'], // Validation for 'number'
    unique: true, // Ensures room numbers are unique
  },
  type: {
    type: String,
    required: [true, 'Room type is required'],
    enum: ['Single', 'Double', 'Suite'], // Restrict room types to specific values
  },
  price: {
    type: Number,
    required: [true, 'Room price is required'],
    min: [0, 'Price must be a positive number'], // Ensure price is non-negative
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
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation date
  },
});

module.exports = mongoose.model('Room', roomSchema);