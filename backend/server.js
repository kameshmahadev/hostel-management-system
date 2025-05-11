const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/rooms', require('./routes/roomRoutes'));
app.use('/api/residents', require('./routes/residentRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/maintenance', require('./routes/maintenanceRoutes'));
app.use('/api/bills', require('./routes/billRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
