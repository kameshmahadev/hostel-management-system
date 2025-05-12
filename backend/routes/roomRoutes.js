// routes/roomRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllRooms,
  createRoom,
  updateRoom
} = require('../controllers/roomController'); // ✅ Correct names now
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', getAllRooms);  // ✅ Works now
router.post('/', createRoom);  // ✅ Works now

// Update a room by ID
router.put('/:id', protect, authorizeRoles('admin'), updateRoom);

module.exports = router;
