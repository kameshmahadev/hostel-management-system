// backend/routes/billingRoutes.js
const express = require('express');
const router = express.Router();

let bills = [
  { id: 1, residentId: 1, amount: 1000, status: 'Paid', date: '2024-06-01' }
];

router.get('/', (req, res) => {
  res.json(bills);
});

router.post('/', (req, res) => {
  const newBill = { id: Date.now(), ...req.body };
  bills.push(newBill);
  res.status(201).json(newBill);
});

router.put('/:id', (req, res) => {
  const billId = parseInt(req.params.id);
  const index = bills.findIndex(b => b.id === billId);
  if (index !== -1) {
    bills[index] = { ...bills[index], ...req.body };
    res.json(bills[index]);
  } else {
    res.status(404).json({ message: 'Bill not found' });
  }
});

router.delete('/:id', (req, res) => {
  const billId = parseInt(req.params.id);
  bills = bills.filter(b => b.id !== billId);
  res.status(204).end();
});

module.exports = router;
