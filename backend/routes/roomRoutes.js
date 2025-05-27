// routes/roomRoutes.js
const express = require('express');
const router = express.Router();
const {
  getRooms,
  getRoomById,
  addRoom,
  updateRoom,
  deleteRoom,
} = require('../controllers/roomController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const Room = require('../models/Room');
const User = require('../models/User');

// Room Routes
router.get('/', protect, getRooms);
router.post('/', protect, authorizeRoles('admin', 'staff'), addRoom);
router.get('/:id', protect, getRoomById);
router.put('/:id', protect, authorizeRoles('admin', 'staff'), updateRoom);
router.delete('/:id', protect, authorizeRoles('admin', 'staff'), deleteRoom);

// Assign Room Route
router.post('/:id/assign', protect, authorizeRoles('admin', 'staff'), async (req, res) => {
  const { residentId } = req.body;

  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    const resident = await User.findById(residentId);
    if (!resident) return res.status(404).json({ message: 'Resident not found' });

    room.currentResident = residentId;
    room.status = 'Occupied';

    await room.save();

    res.json({ message: 'Room assigned successfully', room });
  } catch (error) {
    res.status(500).json({ message: 'Error assigning room', error });
  }
});

module.exports = router;
