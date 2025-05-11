// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/rooms', require('./routes/roomRoutes'));
app.use('/api/residents', require('./routes/residentRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/billing', require('./routes/billingRoutes'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
