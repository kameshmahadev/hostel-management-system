// backend/controllers/maintenanceController.js

const Maintenance = require('../models/Maintenance');

// Create request
const createRequest = async (req, res) => {
  try {
    const request = new Maintenance(req.body);
    await request.save();
    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all
const getAllRequests = async (req, res) => {
  try {
    const requests = await Maintenance.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get by ID
const getRequestById = async (req, res) => {
  try {
    const request = await Maintenance.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found' });
    res.json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update
const updateRequest = async (req, res) => {
  try {
    const updated = await Maintenance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete
const deleteRequest = async (req, res) => {
  try {
    await Maintenance.findByIdAndDelete(req.params.id);
    res.json({ message: 'Request deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
};
