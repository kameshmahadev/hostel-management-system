const Room = require('../models/Room');
const User = require('../models/User');

// Fetch all rooms
const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate('currentResident', 'name email');
    res.status(200).json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Fetch a single room by ID
const getRoomById = async (req, res) => { // <--- NEW FUNCTION
  try {
    const room = await Room.findById(req.params.id).populate('currentResident', 'name email');
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json(room);
  } catch (error) {
    console.error('Error fetching single room:', error);
    // Handle invalid ObjectId format
    if (error.kind === 'ObjectId') {
        return res.status(400).json({ message: 'Invalid Room ID format.' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Add a new room
const addRoom = async (req, res) => {
  // ... (your existing addRoom logic)
  try {
    const { number, type, capacity, price, occupied } = req.body;
    if (!number || !type || !capacity || !price) {
      return res.status(400).json({ message: 'All required fields (number, type, capacity, price) are missing.' });
    }
    if (isNaN(capacity) || capacity < 1) {
      return res.status(400).json({ message: 'Capacity must be a positive number.' });
    }
    if (isNaN(price) || price < 0) {
      return res.status(400).json({ message: 'Price must be a non-negative number.' });
    }
    const existingRoom = await Room.findOne({ number });
    if (existingRoom) {
      return res.status(400).json({ message: `Room number ${number} already exists.` });
    }
    let initialStatus = 'Available';
    if (typeof occupied === 'boolean') {
      initialStatus = occupied ? 'Occupied' : 'Available';
    }
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
    console.error('Error adding room:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    if (error.code === 11000) {
        return res.status(400).json({ message: `Duplicate key error: Room number ${req.body.number} already exists.` });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update room details
const updateRoom = async (req, res) => {
  // ... (your existing updateRoom logic)
  try {
    const { id } = req.params;
    const { type, capacity, price, status, currentResident, checkInDate, checkOutDate } = req.body;
    if (capacity && (isNaN(capacity) || capacity < 1)) {
        return res.status(400).json({ message: 'Capacity must be a positive number.' });
    }
    if (price && (isNaN(price) || price < 0)) {
        return res.status(400).json({ message: 'Price must be a non-negative number.' });
    }
    if (status && !['Available', 'Occupied', 'Under Maintenance'].includes(status)) {
        return res.status(400).json({ message: 'Invalid room status.' });
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
                return res.status(400).json({ message: 'Resident not found.' });
            }
            roomUpdates.currentResident = currentResident;
            roomUpdates.status = 'Occupied';
            roomUpdates.checkInDate = new Date();
            roomUpdates.checkOutDate = null;
        }
    }
    if (checkInDate) roomUpdates.checkInDate = new Date(checkInDate);
    if (checkOutDate) roomUpdates.checkOutDate = new Date(checkOutDate);
    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      roomUpdates,
      { new: true, runValidators: true }
    ).populate('currentResident', 'name email');
    if (!updatedRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json({ message: 'Room updated successfully', room: updatedRoom });
  } catch (error) {
    console.error('Error updating room:', error);
    if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(val => val.message);
        return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a room
const deleteRoom = async (req, res) => {
  // ... (your existing deleteRoom logic)
  try {
    const { id } = req.params;
    const deletedRoom = await Room.findByIdAndDelete(id);
    if (!deletedRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error('Error deleting room:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getRooms, getRoomById, addRoom, updateRoom, deleteRoom }; // <--- EXPORT NEW FUNCTION