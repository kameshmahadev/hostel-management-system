const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

// App setup
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require('./routes/authRoutes');
// const roomRoutes = require('./routes/roomRoutes');
// const bookingRoutes = require('./routes/bookingRoutes');
// const userRoutes = require('./routes/userRoutes');
// const billRoutes = require('./routes/billRoutes');
// const maintenanceRoutes = require('./routes/maintenanceRoutes');

// Route Registration
app.use('/api/auth', authRoutes);
// app.use('/api/rooms', roomRoutes);
// app.use('/api/bookings', bookingRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/bills', billRoutes);
// app.use('/api/maintenance', maintenanceRoutes);

// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to the Hostel Management API');
});

// Error Utilities
const AppError = require('./utils/AppError');
const errorHandler = require('./middleware/ErrorHandler');

// Handle Unmatched Routes
app.use('*', (req, res, next) => {
    next(new AppError('Route not found', 404));
});

// Global Error Handler
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