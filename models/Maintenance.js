const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  description: { type: String, required: true },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
  status: { type: String, enum: ['Pending', 'In Progress', 'Resolved'], default: 'Pending' },
});

module.exports = mongoose.model('Maintenance', maintenanceSchema);