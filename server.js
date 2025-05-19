const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes'); // Adjust if needed
const roomRoutes = require('./routes/roomRoutes'); // Added missing import
const bookingRoutes = require('./routes/bookingRoutes'); // Adjust if needed
const userRoutes = require('./routes/userRoutes'); // Adjust if needed
const billRoutes = require('./routes/billRoutes'); // Adjust if needed
const maintenanceRoutes = require('./routes/maintenanceRoutes'); // Adjust if needed

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes); // Fixed missing import
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/maintenance', maintenanceRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the Hostel Management API');
});

// DB + Server start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message);
  });