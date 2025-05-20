// controllers/billController.js
const Bill = require('../models/bill'); // ✅ FIXED import path

// Create a new bill
const createBill = async (req, res) => {
  try {
    const { resident, amount, dueDate, status, description } = req.body;

    const newBill = await Bill.create({
      resident,
      amount,
      dueDate,
      status,
      description,
    });

    res.status(201).json({ message: 'Bill created', bill: newBill });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create bill', error: err.message });
  }
};

// Get all bills (admin/staff) or own bills (resident)
const getBills = async (req, res) => {
  try {
    const filter = req.user.role === 'resident' ? { resident: req.user._id } : {};
    const bills = await Bill.find(filter).populate('resident', 'name email');
    res.json(bills);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bills', error: err.message });
  }
};

// Get a single bill by ID
const getBillById = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id).populate('resident', 'name email');
    if (!bill) return res.status(404).json({ message: 'Bill not found' });
    res.json(bill);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bill', error: err.message });
  }
};

// Update a bill
const updateBill = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) return res.status(404).json({ message: 'Bill not found' });

    const { amount, dueDate, status, description } = req.body;

    if (amount !== undefined) bill.amount = amount;
    if (dueDate !== undefined) bill.dueDate = dueDate;
    if (status !== undefined) bill.status = status;
    if (description !== undefined) bill.description = description;

    const updated = await bill.save();
    res.json({ message: 'Bill updated', bill: updated });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update bill', error: err.message });
  }
};

// Delete a bill
const deleteBill = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) return res.status(404).json({ message: 'Bill not found' });

    await Bill.deleteOne({ _id: bill._id });
    res.json({ message: 'Bill deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete bill', error: err.message });
  }
};

module.exports = {
  createBill,
  getBills,
  getBillById,
  updateBill,
  deleteBill,
};
