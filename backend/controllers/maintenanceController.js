const Maintenance = require('../models/Maintenance');
const AppError = require('../utils/AppError');

const getAllMaintenance = async (req, res, next) => {
  try {
    const query = req.user.role === 'resident' ? { resident: req.user._id } : {};
    const maintenanceList = await Maintenance.find(query)
      .populate('resident', 'name email')
      .populate('room', 'number');

    res.json(maintenanceList);
  } catch (err) {
    next(err);
  }
};

const updateMaintenance = async (req, res, next) => {
  try {
    const maintenance = await Maintenance.findById(req.params.id);
    if (!maintenance) return next(new AppError('Maintenance request not found', 404));

    if (
      req.user.role !== 'admin' &&
      req.user.role !== 'staff' &&
      req.user._id.toString() !== maintenance.resident.toString()
    ) {
      return next(new AppError('Unauthorized to update this request', 403));
    }

    const { issue, priority, status } = req.body;
    if (issue) maintenance.issue = issue;
    if (priority) maintenance.priority = priority;
    if (status) maintenance.status = status;

    const updated = await maintenance.save();
    res.json({ message: 'Request status updated', maintenance: updated });
  } catch (err) {
    next(err);
  }
};

const deleteMaintenance = async (req, res, next) => {
  try {
    const maintenance = await Maintenance.findById(req.params.id);
    if (!maintenance) return next(new AppError('Maintenance request not found', 404));

    if (
      req.user.role !== 'admin' &&
      req.user.role !== 'staff' &&
      req.user._id.toString() !== maintenance.resident.toString()
    ) {
      return next(new AppError('Unauthorized to delete this request', 403));
    }

    await maintenance.deleteOne();
    res.json({ message: 'Maintenance request deleted successfully' });
  } catch (err) {
    next(err);
  }
};

const createMaintenance = async (req, res, next) => {
  try {
    const { room, issue, priority } = req.body;
    const newRequest = await Maintenance.create({
      resident: req.user._id,
      room,
      issue,
      priority,
    });
    res.status(201).json(newRequest);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllMaintenance,
  updateMaintenance,
  deleteMaintenance,
  createMaintenance,
};
