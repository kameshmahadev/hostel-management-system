const Bill = require('../models/Bill');

exports.getAllBills = async (req, res) => {
  const bills = await Bill.find();
  res.json(bills);
};

exports.createBill = async (req, res) => {
  const newBill = await Bill.create(req.body);
  res.status(201).json(newBill);
};

exports.updateBill = async (req, res) => {
  const updated = await Bill.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteBill = async (req, res) => {
  await Bill.findByIdAndDelete(req.params.id);
  res.json({ message: 'Bill deleted' });
};
