// backend/server.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

// Routes
const roomRoutes = require("./routes/roomRoutes");
const residentRoutes = require("./routes/residentRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");

app.use("/api/rooms", roomRoutes);
app.use("/api/residents", residentRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/invoices", invoiceRoutes);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
