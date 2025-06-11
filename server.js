const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require('./routes/userRoutes');
const billRoutes = require('./routes/billRoutes');
const maintenanceRoutes = require('./routes/maintenanceRoutes');
const residentRoutes = require('./routes/residentRoutes');
const utilityRoutes = require('./routes/utilityRoutes');

const AppError = require('./utils/AppError');      // Your custom error class
const errorHandler = require('./middleware/ErrorHandler'); // Your global error handler middleware

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Route Registration - All specific API routes should go here
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/residents', residentRoutes);
app.use('/api', utilityRoutes);

// Root Route - Your simple homepage for the API
app.get('/', (req, res) => {
  res.send('Welcome to the Hostel Management API');
});

// ✅ IMPORTANT: Handle Unmatched Routes (404)
// This middleware MUST come AFTER all your specific routes
// and BEFORE your global error handler.
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// ✅ Global error handling middleware
// This middleware MUST come LAST in your middleware chain.
app.use(errorHandler);

// MongoDB Connection and Server Start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection failed:', error.message);
  });