const Room = require('../models/Room');
const User = require('../models/User');
const AppError = require('../utils/AppError');

// Fetch all rooms
const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find().populate('currentResident', 'name email');
    res.status(200).json(rooms);
  } catch (error) {
    next(new AppError('Error fetching rooms', 500, error.message));
  }
};

// Fetch a single room by ID
const getRoomById = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id).populate('currentResident', 'name email');
    if (!room) throw new AppError('Room not found', 404);
    res.status(200).json(room);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return next(new AppError('Invalid Room ID format', 400));
    }
    next(new AppError('Error fetching room', 500, error.message));
  }
};

// Add a new room
const addRoom = async (req, res, next) => {
  try {
    const { number, type, capacity, price, occupied } = req.body;

    if (!number || !type || !capacity || !price) {
      throw new AppError('All required fields (number, type, capacity, price) are missing.', 400);
    }

    if (isNaN(capacity) || capacity < 1) {
      throw new AppError('Capacity must be a positive number.', 400);
    }

    if (isNaN(price) || price < 0) {
      throw new AppError('Price must be a non-negative number.', 400);
    }

    const existingRoom = await Room.findOne({ number });
    if (existingRoom) {
      throw new AppError(`Room number ${number} already exists.`, 400);
    }

    let initialStatus = occupied === true ? 'Occupied' : 'Available';

    const newRoom = new Room({
      number,
      type,
      capacity,
      price,
      status: initialStatus,
    });

    const savedRoom = await newRoom.save();
    res.status(201).json({ message: 'Room added successfully', room: savedRoom });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message).join(', ');
      return next(new AppError(messages, 400));
    }
    if (error.code === 11000) {
      return next(new AppError(`Duplicate key error: Room number ${req.body.number} already exists.`, 400));
    }
    next(new AppError('Error adding room', 500, error.message));
  }
};

// Update room details
const updateRoom = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { type, capacity, price, status, currentResident, checkInDate, checkOutDate } = req.body;

    if (capacity && (isNaN(capacity) || capacity < 1)) {
      throw new AppError('Capacity must be a positive number.', 400);
    }

    if (price && (isNaN(price) || price < 0)) {
      throw new AppError('Price must be a non-negative number.', 400);
    }

    if (status && !['Available', 'Occupied', 'Under Maintenance'].includes(status)) {
      throw new AppError('Invalid room status.', 400);
    }

    const roomUpdates = { type, capacity, price, status };

    if (currentResident !== undefined) {
      if (currentResident === null) {
        roomUpdates.currentResident = null;
        roomUpdates.status = 'Available';
        roomUpdates.checkOutDate = new Date();
      } else {
        const residentExists = await User.findById(currentResident);
        if (!residentExists) {
          throw new AppError('Resident not found.', 400);
        }
        roomUpdates.currentResident = currentResident;
        roomUpdates.status = 'Occupied';
        roomUpdates.checkInDate = new Date();
        roomUpdates.checkOutDate = null;
      }
    }

    if (checkInDate) roomUpdates.checkInDate = new Date(checkInDate);
    if (checkOutDate) roomUpdates.checkOutDate = new Date(checkOutDate);

    const updatedRoom = await Room.findByIdAndUpdate(id, roomUpdates, {
      new: true,
      runValidators: true
    }).populate('currentResident', 'name email');

    if (!updatedRoom) throw new AppError('Room not found', 404);

    res.status(200).json({ message: 'Room updated successfully', room: updatedRoom });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message).join(', ');
      return next(new AppError(messages, 400));
    }
    next(new AppError('Error updating room', 500, error.message));
  }
};

// Delete a room
const deleteRoom = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedRoom = await Room.findByIdAndDelete(id);
    if (!deletedRoom) throw new AppError('Room not found', 404);
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    next(new AppError('Error deleting room', 500, error.message));
  }
};

module.exports = { getRooms, getRoomById, addRoom, updateRoom, deleteRoom };
