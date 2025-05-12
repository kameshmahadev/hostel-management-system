// backend/controllers/billController.js

const Bill = require('../models/Bill');
const Resident = require('../models/Resident');

// Create new bill
exports.createBill = async (req, res) => {
  const bill = await Bill.create(req.body);
  res.status(201).json(bill);
};

// Get all bills
exports.getAllBills = async (req, res) => {
  const bills = await Bill.find().populate('resident');
  res.json(bills);
};

// Get a single bill
const getBillById = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) return res.status(404).json({ message: 'Bill not found' });
    res.json(bill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a bill
exports.updateBill = async (req, res) => {
  const bill = await Bill.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!bill) return res.status(404).json({ message: 'Bill not found' });
  res.json(bill);
};

// Delete a bill
exports.deleteBill = async (req, res) => {
  await Bill.findByIdAndDelete(req.params.id);
  res.json({ message: 'Bill deleted' });
};

// Get all residents with pagination
exports.getAllResidents = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const residents = await Resident.find().skip(skip).limit(limit);
  const total = await Resident.countDocuments();

  res.json({
    total,
    page,
    pages: Math.ceil(total / limit),
    residents
  });
};

module.exports = {
  createBill: exports.createBill,
  getAllBills: exports.getAllBills,
  getBillById,
  updateBill: exports.updateBill,
  deleteBill: exports.deleteBill,
  getAllResidents: exports.getAllResidents,
};
