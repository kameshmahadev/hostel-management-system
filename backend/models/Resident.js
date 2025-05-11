const mongoose = require("mongoose");

const residentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactInfo: { type: String },
  emergencyContact: { type: String },
  roomAssigned: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  checkInDate: { type: Date, default: Date.now },
  checkOutDate: { type: Date },
});

module.exports = mongoose.model("Resident", residentSchema);
