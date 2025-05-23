const express = require('express');
const router = express.Router();
// Assuming you have middleware for authentication/authorization
const { protect, authorize } = require('../middleware/authMiddleware'); // <--- ADD THIS LINE if you have auth middleware

// Import the room controller functions
const {
  getRooms,
  addRoom,
  updateRoom,
  deleteRoom,
} = require('../controllers/roomController');

// You don't need to require Resident model here if it's imported in the controller/model
// require('../models/Resident'); // If 'Resident' model is separate from 'User'


// Routes
// Apply 'protect' middleware to all room routes that require authentication
// Apply 'authorize' middleware for role-based access control (e.g., only admin/staff can add/delete/update)

// GET all rooms (e.g., accessible to all authenticated users)
router.get('/', protect, getRooms);

// CREATE a new room (e.g., only accessible to admin/staff)
router.post('/', protect, authorize(['admin', 'staff']), addRoom);

// GET single room
router.get('/:id', protect, getRooms); // Reusing getRooms, might need a getRoomById in controller

// UPDATE a room (e.g., only accessible to admin/staff)
router.put('/:id', protect, authorize(['admin', 'staff']), updateRoom);

// DELETE a room (e.g., only accessible to admin/staff)
router.delete('/:id', protect, authorize(['admin', 'staff']), deleteRoom);


module.exports = router;