const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  resident: { type: mongoose.Schema.Types.ObjectId, ref: 'Resident' },
  amount: Number,
  description: String,
  dueDate: Date,
  paid: { type: Boolean, default: false }
});

module.exports = mongoose.model('Bill', billSchema);
