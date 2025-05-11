const mongoose = require("mongoose");

const maintenanceRequestSchema = new mongoose.Schema({
  residentId: { type: mongoose.Schema.Types.ObjectId, ref: "Resident" },
  issueDescription: { type: String, required: true },
  priorityLevel: { type: String, enum: ["Low", "Medium", "High"], required: true },
  status: { type: String, enum: ["Pending", "In Progress", "Resolved"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("MaintenanceRequest", maintenanceRequestSchema);
