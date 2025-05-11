const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true },
  roomType: { type: String, required: true },
  bedCount: { type: Number, required: true },
  price: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Resident" },
});

module.exports = mongoose.model("Room", roomSchema);
