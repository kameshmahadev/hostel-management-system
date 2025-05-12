const Room = require('../models/Room');

exports.getAllRooms = async (req, res) => {
  const rooms = await Room.find();
  res.json(rooms);
};

exports.createRoom = async (req, res) => {
  const newRoom = await Room.create(req.body);
  res.status(201).json(newRoom);
};

exports.updateRoom = async (req, res) => {
  try {
    const { id } = req.params; // Extract room ID from the request parameters
    const updates = req.body; // Extract updates from the request body

    // Find the room by ID and update it
    const room = await Room.findByIdAndUpdate(id, updates, { new: true });

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.status(200).json(room);
  } catch (error) {
    console.error('❌ Room Update Error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteRoom = async (req, res) => {
  await Room.findByIdAndDelete(req.params.id);
  res.json({ message: 'Room deleted' });
};
