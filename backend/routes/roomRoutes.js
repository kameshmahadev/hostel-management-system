const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const {
  getRooms,
  getRoomById,
  addRoom,
  updateRoom,
  deleteRoom,
} = require('../controllers/roomController');

// Routes
router.get('/', protect, getRooms);
router.post('/', protect, authorizeRoles(['admin', 'staff']), addRoom);
router.get('/:id', protect, getRoomById);
router.put('/:id', protect, authorizeRoles(['admin', 'staff']), updateRoom);
router.delete('/:id', protect, authorizeRoles(['admin', 'staff']), deleteRoom);

module.exports = router;
