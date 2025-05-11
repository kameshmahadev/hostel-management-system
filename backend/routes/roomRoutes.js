const express = require('express');
const router = express.Router();
const {
  getAllRooms,
  createRoom,
  updateRoom,
  deleteRoom,
} = require('../controllers/roomController');

const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', protect, getAllRooms);
router.post('/', protect, authorizeRoles('admin'), createRoom);
router.put('/:id', protect, authorizeRoles('admin'), updateRoom);
router.delete('/:id', protect, authorizeRoles('admin'), deleteRoom);

module.exports = router;
