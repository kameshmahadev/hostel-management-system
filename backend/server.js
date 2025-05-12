// server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config(); // Load .env variables

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse incoming JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Import routes
const userRoutes = require('./routes/userRoutes');
const roomRoutes = require('./routes/roomRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const maintenanceRoutes = require('./routes/maintenanceRoutes');
const billRoutes = require('./routes/billRoutes');
const residentRoutes = require('./routes/residentRoutes'); // ✅ Added

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/maintenance', require('./routes/maintenanceRoutes'));
app.use('/api/bills', require('./routes/billRoutes'));
app.use('/api/residents', residentRoutes); // ✅ Mounted resident routes

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
