const express = require('express');
const router = express.Router();

// GET all rooms
router.get('/', (req, res) => {
  res.json({ message: 'Fetch all rooms' });
});

// GET single room by ID
router.get('/:id', (req, res) => {
  res.json({ message: `Fetch room with ID ${req.params.id}` });
});

// POST create new room
router.post('/', (req, res) => {
  res.json({ message: 'Create new room', data: req.body });
});

// PUT update room
router.put('/:id', (req, res) => {
  res.json({ message: `Update room with ID ${req.params.id}`, data: req.body });
});

// DELETE room
router.delete('/:id', (req, res) => {
  res.json({ message: `Delete room with ID ${req.params.id}` });
});

module.exports = router;
