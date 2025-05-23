const express = require('express');
const router = express.Router();
// Assuming you have middleware for authentication/authorization
const { protect, authorizeRoles } = require('../middleware/authMiddleware'); // <--- CHANGED HERE: authorize to authorizeRoles

// Import the room controller functions
const {
  getRooms,
  addRoom,
  updateRoom,
  deleteRoom,
} = require('../controllers/roomController');

// You don't need to require Resident model here if it's imported in the controller/model
// require('../models/Resident');


// Routes
// Apply 'protect' middleware to all room routes that require authentication
// Apply 'authorizeRoles' middleware for role-based access control (e.g., only admin/staff can add/delete/update)

// GET all rooms (e.g., accessible to all authenticated users)
router.get('/', protect, getRooms);

// CREATE a new room (e.g., only accessible to admin/staff)
router.post('/', protect, authorizeRoles(['admin', 'staff']), addRoom); // <--- authorizeRoles used here

// GET single room
router.get('/:id', protect, getRooms); // Reusing getRooms, might need a getRoomById in controller

// UPDATE a room (e.g., only accessible to admin/staff)
router.put('/:id', protect, authorizeRoles(['admin', 'staff']), updateRoom); // <--- authorizeRoles used here

// DELETE a room (e.g., only accessible to admin/staff)
router.delete('/:id', protect, authorizeRoles(['admin', 'staff']), deleteRoom); // <--- authorizeRoles used here


module.exports = router;