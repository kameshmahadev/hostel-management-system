const express = require('express');
const router = express.Router();

// GET all maintenance requests
router.get('/', (req, res) => {
  res.json({ message: 'Fetch all maintenance requests' });
});

// GET single request
router.get('/:id', (req, res) => {
  res.json({ message: `Fetch maintenance request with ID ${req.params.id}` });
});

// POST new maintenance request
router.post('/', (req, res) => {
  res.json({ message: 'Create maintenance request', data: req.body });
});

// PUT update request
router.put('/:id', (req, res) => {
  res.json({ message: `Update maintenance request with ID ${req.params.id}`, data: req.body });
});

// DELETE request
router.delete('/:id', (req, res) => {
  res.json({ message: `Delete maintenance request with ID ${req.params.id}` });
});

module.exports = router;
