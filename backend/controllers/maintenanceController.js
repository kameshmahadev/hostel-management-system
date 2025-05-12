// backend/controllers/maintenanceController.js

const Maintenance = require('../models/Maintenance');
const Resident = require('../models/Resident');

exports.createMaintenance = async (req, res) => {
  const maintenance = await Maintenance.create(req.body);
  res.status(201).json(maintenance);
};

exports.getAllMaintenance = async (req, res) => {
  const maintenance = await Maintenance.find().populate('room');
  res.json(maintenance);
};

exports.updateMaintenance = async (req, res) => {
  const maintenance = await Maintenance.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!maintenance) return res.status(404).json({ message: 'Maintenance not found' });
  res.json(maintenance);
};

exports.deleteMaintenance = async (req, res) => {
  await Maintenance.findByIdAndDelete(req.params.id);
  res.json({ message: 'Maintenance deleted' });
};

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
