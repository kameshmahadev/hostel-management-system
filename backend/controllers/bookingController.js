const Booking = require('../models/Booking');

exports.getAllBookings = async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
};

exports.createBooking = async (req, res) => {
  const newBooking = await Booking.create(req.body);
  res.status(201).json(newBooking);
};

exports.updateBooking = async (req, res) => {
  const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteBooking = async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.json({ message: 'Booking deleted' });
};
