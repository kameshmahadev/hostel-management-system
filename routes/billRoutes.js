const express = require('express');
const router = express.Router();
const Bill = require('../models/Bill');

// GET all bills
router.get('/', async (req, res) => {
  try {
    const bills = await Bill.find().populate('resident', 'name email');
    res.status(200).json(bills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET bill by ID
router.get('/:id', async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id).populate('resident', 'name email');
    if (!bill) return res.status(404).json({ message: 'Bill not found' });
    res.status(200).json(bill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new bill
router.post('/', async (req, res) => {
  try {
    const bill = new Bill(req.body);
    const savedBill = await bill.save();
    res.status(201).json(savedBill);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update bill
router.put('/:id', async (req, res) => {
  try {
    const updatedBill = await Bill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBill) return res.status(404).json({ message: 'Bill not found' });
    res.status(200).json(updatedBill);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE bill
router.delete('/:id', async (req, res) => {
  try {
    const deletedBill = await Bill.findByIdAndDelete(req.params.id);
    if (!deletedBill) return res.status(404).json({ message: 'Bill not found' });
    res.status(200).json({ message: 'Bill deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

