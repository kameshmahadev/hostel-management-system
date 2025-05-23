const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  number: {
    type: String,
    required: [true, 'Room number is required'],
    unique: true, // Ensures room numbers are unique
    trim: true // Removes whitespace from both ends of a string
  },
  type: {
    type: String,
    required: [true, 'Room type is required'],
    // Align with your frontend's dropdown options
    enum: ['Standard', 'Deluxe', 'Suite', 'Dormitory'],
    default: 'Standard' // Set a default type
  },
  capacity: { // New field for capacity
    type: Number,
    required: [true, 'Room capacity is required'],
    min: [1, 'Capacity must be at least 1'],
  },
  price: {
    type: Number,
    required: [true, 'Room price is required'],
    min: [0, 'Price must be a non-negative number'], // Allow 0, though >0 usually implied for booking
  },
  // Use 'status' as the primary indicator, and 'occupied' can be derived or a secondary flag
  status: {
    type: String,
    enum: ['Available', 'Occupied', 'Under Maintenance'],
    default: 'Available',
    required: true,
  },
  // If you still want 'occupied' as a separate boolean for clarity,
  // ensure its value is consistent with 'status' when saving.
  // For simplicity, I'd recommend relying primarily on 'status'.
  // occupied: {
  //   type: Boolean,
  //   default: false,
  // },
  currentResident: { // Link to the Resident model (assuming you have one)
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming 'User' is your resident model, if 'Resident' exists, use 'Resident'
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