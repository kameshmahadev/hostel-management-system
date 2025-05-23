const Room = require('../models/Room');
const User = require('../models/User'); // Assuming Resident model is named User or Resident

// Fetch all rooms
const getRooms = async (req, res) => {
  try {
    // Populate currentResident if needed, otherwise remove .populate()
    // Assuming 'name' is a field in your User/Resident model
    const rooms = await Room.find().populate('currentResident', 'name email');
    res.status(200).json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add a new room
const addRoom = async (req, res) => {
  try {
    // Destructure all fields that your frontend is sending
    const { number, type, capacity, price, occupied } = req.body;

    // --- Server-side Validation ---
    if (!number || !type || !capacity || !price) {
      return res.status(400).json({ message: 'All required fields (number, type, capacity, price) are missing.' });
    }

    if (isNaN(capacity) || capacity < 1) {
      return res.status(400).json({ message: 'Capacity must be a positive number.' });
    }

    if (isNaN(price) || price < 0) {
      return res.status(400).json({ message: 'Price must be a non-negative number.' });
    }

    // Check if room number already exists
    const existingRoom = await Room.findOne({ number });
    if (existingRoom) {
      return res.status(400).json({ message: `Room number ${number} already exists.` });
    }

    // Determine initial status based on 'occupied' from frontend or default
    let initialStatus = 'Available';
    if (typeof occupied === 'boolean') {
      initialStatus = occupied ? 'Occupied' : 'Available';
    }

    // Create a new room instance
    const newRoom = new Room({
      number,
      type,
      capacity,
      price,
      status: initialStatus, // Set status based on 'occupied' from frontend
    });

    // Save the room to the database
    const savedRoom = await newRoom.save();
    res.status(201).json({ message: 'Room added successfully', room: savedRoom });
  } catch (error) {
    // Mongoose validation errors or other server errors
    console.error('Error adding room:', error);
    // Check for Mongoose validation errors (e.g., enum mismatch)
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    // Handle duplicate key errors if the 'unique' index is hit outside of the findOne check
    if (error.code === 11000) {
        return res.status(400).json({ message: `Duplicate key error: Room number ${req.body.number} already exists.` });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update room details
const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, capacity, price, status, currentResident, checkInDate, checkOutDate } = req.body; // Include all possible updatable fields

    // Basic validation for updates
    if (capacity && (isNaN(capacity) || capacity < 1)) {
        return res.status(400).json({ message: 'Capacity must be a positive number.' });
    }
    if (price && (isNaN(price) || price < 0)) {
        return res.status(400).json({ message: 'Price must be a non-negative number.' });
    }
    // Add validation for 'status' enum if it's sent
    if (status && !['Available', 'Occupied', 'Under Maintenance'].includes(status)) {
        return res.status(400).json({ message: 'Invalid room status.' });
    }

    const roomUpdates = { type, capacity, price, status };

    // Handle currentResident assignment/unassignment logic
    if (currentResident !== undefined) {
        if (currentResident === null) { // Unassign resident (checkout)
            roomUpdates.currentResident = null;
            roomUpdates.status = 'Available';
            roomUpdates.checkOutDate = new Date();
        } else { // Assign resident (checkin)
            // Validate if resident exists (optional but good practice)
            const residentExists = await User.findById(currentResident); // Assuming User is your resident model
            if (!residentExists) {
                return res.status(400).json({ message: 'Resident not found.' });
            }
            roomUpdates.currentResident = currentResident;
            roomUpdates.status = 'Occupied';
            roomUpdates.checkInDate = new Date();
            roomUpdates.checkOutDate = null; // Clear checkout date on checkin
        }
    }

    if (checkInDate) roomUpdates.checkInDate = new Date(checkInDate);
    if (checkOutDate) roomUpdates.checkOutDate = new Date(checkOutDate);


    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      roomUpdates, // Use the prepared updates object
      { new: true, runValidators: true } // runValidators ensures Mongoose schema validation runs on update
    ).populate('currentResident', 'name email'); // Populate after update

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

module.exports = { getRooms, addRoom, updateRoom, deleteRoom };