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
  const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedRoom);
};

exports.deleteRoom = async (req, res) => {
  await Room.findByIdAndDelete(req.params.id);
  res.json({ message: 'Room deleted' });
};
