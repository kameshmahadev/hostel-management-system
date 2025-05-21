const express = require('express');
const router = express.Router();
const Maintenance = require('../models/Maintenance');

// CREATE a maintenance request
router.post('/', async (req, res) => {
  try {
    const request = new Maintenance(req.body);
    const savedRequest = await request.save();
    res.status(201).json(savedRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET all maintenance requests
router.get('/', async (req, res) => {
  try {
    const requests = await Maintenance.find()
      .populate('resident', 'name email')
      .populate('room', 'number');
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single maintenance request by ID
router.get('/:id', async (req, res) => {
  try {
    const request = await Maintenance.findById(req.params.id)
      .populate('resident', 'name email')
      .populate('room', 'number');
    if (!request) return res.status(404).json({ message: 'Request not found' });
    res.status(200).json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE a maintenance request
router.put('/:id', async (req, res) => {
  try {
    const updated = await Maintenance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Request not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a maintenance request
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Maintenance.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Request not found' });
    res.status(200).json({ message: 'Request deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
