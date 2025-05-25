const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const User = require('../models/User');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/stats', protect, authorizeRoles('admin', 'staff'), async (req, res) => {
  try {
    const totalRooms = await Room.countDocuments();
    const occupiedRooms = await Room.countDocuments({ status: 'Occupied' });
    const availableRooms = await Room.countDocuments({ status: 'Available' });
    const underMaintenanceRooms = await Room.countDocuments({ status: 'Under Maintenance' });
    const totalResidents = await User.countDocuments({ role: 'resident' });

    res.json({
      totalRooms,
      occupiedRooms,
      availableRooms,
      underMaintenanceRooms,
      totalResidents,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats', error });
  }
});

module.exports = router;
