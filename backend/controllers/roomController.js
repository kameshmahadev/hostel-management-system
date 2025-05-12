const Room = require('../models/Room');
const Resident = require('../models/Resident');

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

exports.getAllResidents = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const residents = await Resident.find().skip(skip).limit(limit);
  const total = await Resident.countDocuments();

  res.json({
    total,
    page,
    pages: Math.ceil(total / limit),
    residents
  });
};
