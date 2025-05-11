// backend/routes/bookingRoutes.js
const express = require('express');
const router = express.Router();

let bookings = [
  { id: 1, residentId: 1, roomId: 1, from: '2024-06-01', to: '2024-12-01' }
];

router.get('/', (req, res) => {
  res.json(bookings);
});

router.post('/', (req, res) => {
  const newBooking = { id: Date.now(), ...req.body };
  bookings.push(newBooking);
  res.status(201).json(newBooking);
});

router.put('/:id', (req, res) => {
  const bookingId = parseInt(req.params.id);
  const index = bookings.findIndex(b => b.id === bookingId);
  if (index !== -1) {
    bookings[index] = { ...bookings[index], ...req.body };
    res.json(bookings[index]);
  } else {
    res.status(404).json({ message: 'Booking not found' });
  }
});

router.delete('/:id', (req, res) => {
  const bookingId = parseInt(req.params.id);
  bookings = bookings.filter(b => b.id !== bookingId);
  res.status(204).end();
});

module.exports = router;
