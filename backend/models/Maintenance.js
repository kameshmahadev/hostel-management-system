const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  description: String,
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
  status: { type: String, enum: ['Open', 'In Progress', 'Closed'], default: 'Open' },
  requestedAt: { type: Date, default: Date.now },
  updatedAt: Date
});

module.exports = mongoose.model('Maintenance', maintenanceSchema);
