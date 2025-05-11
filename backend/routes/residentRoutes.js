// backend/routes/residentRoutes.js
const express = require('express');
const router = express.Router();

// Sample resident data
let residents = [
  { id: 1, name: "John Doe", email: "john@example.com", room: "101" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", room: "102" }
];

// GET all residents
router.get('/', (req, res) => {
  res.json(residents);
});

// POST new resident
router.post('/', (req, res) => {
  const newResident = { id: Date.now(), ...req.body };
  residents.push(newResident);
  res.status(201).json(newResident);
});

// PUT update resident
router.put('/:id', (req, res) => {
  const residentId = parseInt(req.params.id);
  const index = residents.findIndex(r => r.id === residentId);
  if (index !== -1) {
    residents[index] = { ...residents[index], ...req.body };
    res.json(residents[index]);
  } else {
    res.status(404).json({ message: 'Resident not found' });
  }
});

// DELETE resident
router.delete('/:id', (req, res) => {
  const residentId = parseInt(req.params.id);
  residents = residents.filter(r => r.id !== residentId);
  res.status(204).end();
});

module.exports = router;
