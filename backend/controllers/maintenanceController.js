const Maintenance = require('../models/Maintenance');

exports.getAllRequests = async (req, res) => {
  const requests = await Maintenance.find();
  res.json(requests);
};

exports.createRequest = async (req, res) => {
  const newRequest = await Maintenance.create(req.body);
  res.status(201).json(newRequest);
};

exports.updateRequest = async (req, res) => {
  const updated = await Maintenance.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteRequest = async (req, res) => {
  await Maintenance.findByIdAndDelete(req.params.id);
  res.json({ message: 'Maintenance request deleted' });
};
