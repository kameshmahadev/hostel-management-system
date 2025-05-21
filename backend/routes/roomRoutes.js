const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

// CREATE a new room
router.post('/', async (req, res) => {
  try {
    const room = new Room(req.body);
    const savedRoom = await room.save();
    res.status(201).json(savedRoom);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ all rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find().populate('currentResident', 'name email');
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ single room
router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate('currentResident');
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.status(200).json(room);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE a room
router.put('/:id', async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRoom) return res.status(404).json({ message: 'Room not found' });
    res.status(200).json(updatedRoom);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a room
router.delete('/:id', async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    if (!deletedRoom) return res.status(404).json({ message: 'Room not found' });
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
