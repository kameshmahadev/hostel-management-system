const Bill = require('../models/Bill');
const AppError = require('../utils/AppError');

const createBill = async (req, res, next) => {
  try {
    const { resident, amount, dueDate, status, description } = req.body;
    const newBill = await Bill.create({ resident, amount, dueDate, status, description });
    res.status(201).json({ message: 'Bill created', bill: newBill });
  } catch (err) {
    next(err);
  }
};

const getBills = async (req, res, next) => {
  try {
    const filter = req.user.role === 'resident' ? { resident: req.user._id } : {};
    const bills = await Bill.find(filter).populate('resident', 'name email');
    res.json(bills);
  } catch (err) {
    next(err);
  }
};

const getBillById = async (req, res, next) => {
  try {
    const bill = await Bill.findById(req.params.id).populate('resident', 'name email');
    if (!bill) return next(new AppError('Bill not found', 404));
    res.json(bill);
  } catch (err) {
    next(err);
  }
};

const updateBill = async (req, res, next) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) return next(new AppError('Bill not found', 404));

    const { amount, dueDate, status, description } = req.body;

    if (amount !== undefined) bill.amount = amount;
    if (dueDate !== undefined) bill.dueDate = dueDate;
    if (status !== undefined) bill.status = status;
    if (description !== undefined) bill.description = description;

    const updated = await bill.save();
    res.json({ message: 'Bill updated', bill: updated });
  } catch (err) {
    next(err);
  }
};

const deleteBill = async (req, res, next) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) return next(new AppError('Bill not found', 404));
    await bill.deleteOne();
    res.json({ message: 'Bill deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createBill,
  getBills,
  getBillById,
  updateBill,
  deleteBill,
};
