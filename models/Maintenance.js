const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Resolved'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Maintenance', maintenanceSchema);
