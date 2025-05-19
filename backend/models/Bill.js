// backend/models/Bill.js

const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  resident: { type: mongoose.Schema.Types.ObjectId, ref: 'Resident', required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['Unpaid', 'Paid'], default: 'Unpaid' }
});

module.exports = mongoose.model('Bill', billSchema);