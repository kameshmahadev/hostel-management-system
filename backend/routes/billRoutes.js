const express = require('express');
const router = express.Router();

// GET all bills
router.get('/', (req, res) => {
  res.json({ message: 'Fetch all bills' });
});

// GET bill by ID
router.get('/:id', (req, res) => {
  res.json({ message: `Fetch bill with ID ${req.params.id}` });
});

// POST new bill
router.post('/', (req, res) => {
  res.json({ message: 'Create new bill', data: req.body });
});

// PUT update bill
router.put('/:id', (req, res) => {
  res.json({ message: `Update bill with ID ${req.params.id}`, data: req.body });
});

// DELETE bill
router.delete('/:id', (req, res) => {
  res.json({ message: `Delete bill with ID ${req.params.id}` });
});

module.exports = router;
