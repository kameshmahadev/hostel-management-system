const Maintenance = require('../models/Maintenance');

// GET - All maintenance requests
const getAllMaintenance = async (req, res) => {
  try {
    const query = req.user.role === 'resident'
      ? { resident: req.user._id }
      : {}; // Admin/Staff see all

    const maintenanceList = await Maintenance.find(query)
      .populate('resident', 'name email')
      .populate('room', 'number');

    res.json(maintenanceList);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching maintenance requests' });
  }
};

// PUT - Update maintenance status or info
const updateMaintenance = async (req, res) => {
  try {
    const maintenance = await Maintenance.findById(req.params.id);

    if (!maintenance) {
      return res.status(404).json({ message: 'Maintenance request not found' });
    }

    // Only admin/staff or the owner can update
    if (
      req.user.role !== 'admin' &&
      req.user.role !== 'staff' &&
      req.user._id.toString() !== maintenance.resident.toString()
    ) {
      return res.status(403).json({ message: 'Unauthorized to update this request' });
    }

    const { issue, priority, status } = req.body;
    if (issue) maintenance.issue = issue;
    if (priority) maintenance.priority = priority;
    if (status) maintenance.status = status;

    const updated = await maintenance.save();
    res.json({ message: 'Request status updated', maintenance: updated });
  } catch (error) {
    res.status(500).json({ message: 'Error updating maintenance request' });
  }
};

// DELETE - Delete a maintenance request
const deleteMaintenance = async (req, res) => {
  try {
    const maintenance = await Maintenance.findById(req.params.id);

    if (!maintenance) {
      return res.status(404).json({ message: 'Maintenance request not found' });
    }

    // Only admin/staff or the owner can delete
    if (
      req.user.role !== 'admin' &&
      req.user.role !== 'staff' &&
      req.user._id.toString() !== maintenance.resident.toString()
    ) {
      return res.status(403).json({ message: 'Unauthorized to delete this request' });
    }

    await maintenance.deleteOne();
    res.json({ message: 'Maintenance request deleted successfully' });
  } catch (error) {
    console.error('DELETE error:', error.message);
    res.status(500).json({ message: 'Error deleting maintenance request' });
  }
};

module.exports = {
  getAllMaintenance,
  updateMaintenance,
  deleteMaintenance,
  createMaintenance: async (req, res) => {
    try {
      const { room, issue, priority } = req.body;
      const newRequest = await Maintenance.create({
        resident: req.user._id,
        room,
        issue,
        priority,
      });
      res.status(201).json(newRequest);
    } catch (error) {
      res.status(500).json({ message: 'Error creating maintenance request' });
    }
  }
};
