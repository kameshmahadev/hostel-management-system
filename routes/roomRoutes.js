const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const {
  getRooms,
  getRoomById, // <--- IMPORT NEW FUNCTION
  addRoom,
  updateRoom,
  deleteRoom,
} = require('../controllers/roomController');


// Routes
router.get('/', protect, getRooms);

router.post('/', protect, authorizeRoles(['admin', 'staff']), addRoom);

router.get('/:id', protect, getRoomById); // <--- USE NEW FUNCTION HERE

router.put('/:id', protect, authorizeRoles(['admin', 'staff']), updateRoom);

router.delete('/:id', protect, authorizeRoles(['admin', 'staff']), deleteRoom);


module.exports = router;