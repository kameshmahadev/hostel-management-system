const Resident = require('../models/Resident');
const AppError = require('../utils/AppError');

exports.getAllResidents = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const residents = await Resident.find().skip(skip).limit(limit);
    const total = await Resident.countDocuments();

    res.json({ total, page, pages: Math.ceil(total / limit), residents });
  } catch (err) {
    next(err);
  }
};

exports.getResident = async (req, res, next) => {
  try {
    const resident = await Resident.findById(req.params.id);
    if (!resident) return next(new AppError('Resident not found', 404));
    res.json(resident);
  } catch (err) {
    next(err);
  }
};

exports.createResident = async (req, res, next) => {
  try {
    const newResident = await Resident.create(req.body);
    res.status(201).json(newResident);
  } catch (err) {
    next(err);
  }
};

exports.updateResident = async (req, res, next) => {
  try {
    const updated = await Resident.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return next(new AppError('Resident not found', 404));
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteResident = async (req, res, next) => {
  try {
    const deleted = await Resident.findByIdAndDelete(req.params.id);
    if (!deleted) return next(new AppError('Resident not found', 404));
    res.json({ message: 'Resident removed' });
  } catch (err) {
    next(err);
  }
};
