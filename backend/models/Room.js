const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  number: {
    type: String,
    required: [true, 'Room number is required'],
    unique: true,
    trim: true
  },
  type: {
    type: String,
    required: [true, 'Room type is required'],
    enum: ['Standard', 'Deluxe', 'Suite', 'Dormitory'],
    default: 'Standard'
  },
  capacity: {
    type: Number,
    required: [true, 'Room capacity is required'],
    min: [1, 'Capacity must be at least 1'],
  },
  price: {
    type: Number,
    required: [true, 'Room price is required'],
    min: [0, 'Price must be a non-negative number'],
  },
  status: {
    type: String,
    enum: ['Available', 'Occupied', 'Under Maintenance'],
    default: 'Available',
    required: true,
  },
  assignedResident: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  checkInDate: {
    type: Date,
    default: null,
  },
  checkOutDate: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Room', roomSchema);
