const express = require('express');
const { getRooms, addRoom, updateRoom, deleteRoom } = require('../controllers/roomController');
const router = express.Router();

// Fetch all rooms
router.get('/', getRooms);

// Add a new room
router.post('/', addRoom);

// Update room details
router.put('/:id', updateRoom);

// Delete a room
router.delete('/:id', deleteRoom);

module.exports = router;