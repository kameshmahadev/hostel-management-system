const Resident = require('../models/Resident');

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

exports.getResident = async (req, res) => {
  const resident = await Resident.findById(req.params.id);
  res.json(resident);
};

exports.createResident = async (req, res) => {
  const newResident = await Resident.create(req.body);
  res.status(201).json(newResident);
};

exports.updateResident = async (req, res) => {
  const updated = await Resident.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteResident = async (req, res) => {
  await Resident.findByIdAndDelete(req.params.id);
  res.json({ message: 'Resident removed' });
};
