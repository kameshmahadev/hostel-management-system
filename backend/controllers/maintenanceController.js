// backend/controllers/maintenanceController.js

const Maintenance = require('../models/Maintenance');

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
