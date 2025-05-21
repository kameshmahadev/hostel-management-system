const express = require('express');
const router = express.Router();

// GET all bookings
router.get('/', (req, res) => {
  res.json({ message: 'Fetch all bookings' });
});

// GET booking by ID
router.get('/:id', (req, res) => {
  res.json({ message: `Fetch booking with ID ${req.params.id}` });
});

// POST create new booking
router.post('/', (req, res) => {
  res.json({ message: 'Create new booking', data: req.body });
});

// PUT update booking
router.put('/:id', (req, res) => {
  res.json({ message: `Update booking with ID ${req.params.id}`, data: req.body });
});

// DELETE booking
router.delete('/:id', (req, res) => {
  res.json({ message: `Delete booking with ID ${req.params.id}` });
});

module.exports = router;
