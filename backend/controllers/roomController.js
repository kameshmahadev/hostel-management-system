const Room = require('../models/Room');

// Get all rooms
const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate('currentResident', 'name email'); // Populate resident details
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch rooms', error: error.message });
  }
};

// Create a new room
const createRoom = async (req, res) => {
  try {
    const { number, type, price } = req.body;

    // Check if the room number already exists
    const existingRoom = await Room.findOne({ number });
    if (existingRoom) {
      return res.status(400).json({ message: 'Room number already exists' });
    }

    const newRoom = new Room({ number, type, price });
    const savedRoom = await newRoom.save();
    res.status(201).json(savedRoom);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create room', error: error.message });
  }
};

// Update a room
const updateRoom = async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update room', error: error.message });
  }
};

// Delete a room
const deleteRoom = async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    if (!deletedRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete room', error: error.message });
  }
};

module.exports = {
  getAllRooms,
  createRoom,
  updateRoom,
  deleteRoom,
};