const Maintenance = require('../models/Maintenance');

// Create a new maintenance request
const createRequest = async (req, res) => {
  try {
    const { resident, room, issue, priority } = req.body;
    if (!resident || !room || !issue) {
      return res.status(400).json({ message: 'Resident, room, and issue are required' });
    }

    const newRequest = new Maintenance({ resident, room, issue, priority });
    await newRequest.save();

    res.status(201).json({ message: 'Maintenance request created', maintenance: newRequest });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all maintenance requests
const getAllRequests = async (req, res) => {
  try {
    const requests = await Maintenance.find()
      .populate('resident', 'name email')
      .populate('room', 'number type');
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update maintenance request status
const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const request = await Maintenance.findById(id);
    if (!request) return res.status(404).json({ message: 'Maintenance request not found' });

    request.status = status || request.status;
    request.updatedAt = Date.now();

    await request.save();
    res.status(200).json({ message: 'Request status updated', maintenance: request });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createRequest,
  getAllRequests,
  updateRequestStatus,
};
