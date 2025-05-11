const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// Routes
try {
  app.use('/api/rooms', require('./routes/roomRoutes'));
  app.use('/api/residents', require('./routes/residentRoutes'));
  app.use('/api/bookings', require('./routes/bookingRoutes'));
  app.use('/api/maintenance', require('./routes/maintenanceRoutes'));
  app.use('/api/bills', require('./routes/billRoutes'));
  app.use('/api/users', require('./routes/userRoutes'));
  app.use('/api/auth', require('./routes/authRoutes')); // 👈 Added Auth Routes
} catch (err) {
  console.error('❌ Route error:', err.message);
}

// Root test route
app.get('/', (req, res) => {
  res.send('🏠 Hostel Management Backend is Running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
