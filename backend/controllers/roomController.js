const Room = require('../models/Room');

// Fetch all rooms
const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add a new room
const addRoom = async (req, res) => {
  try {
    const { number, type, price } = req.body;

    // Check if the room number already exists
    const existingRoom = await Room.findOne({ number });
    if (existingRoom) {
      return res.status(400).json({ message: 'Room number already exists' });
    }

    const newRoom = new Room({ number, type, price });
    await newRoom.save();
    res.status(201).json({ message: 'Room added successfully', room: newRoom });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update room details
const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, price, occupied } = req.body;

    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      { type, price, occupied },
      { new: true }
    );

    if (!updatedRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.status(200).json({ message: 'Room updated successfully', room: updatedRoom });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a room
const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRoom = await Room.findByIdAndDelete(id);
    if (!deletedRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getRooms, addRoom, updateRoom, deleteRoom };