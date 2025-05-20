const Booking = require('../models/Booking');

const createBooking = async (req, res) => {
  try {
    const { room, startDate, endDate } = req.body;

    // Check for overlapping bookings
    const overlappingBooking = await Booking.findOne({
      room,
      $or: [
        {
          startDate: { $lte: new Date(endDate) },
          endDate: { $gte: new Date(startDate) },
        },
      ],
    });

    if (overlappingBooking) {
      return res.status(400).json({ message: 'Room is already booked for the selected dates.' });
    }

    const booking = new Booking({
      resident: req.user._id,
      room,
      startDate,
      endDate
    });

    await booking.save();
    res.status(201).json({ message: 'Booking created', booking });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getAllBookings = async (req, res) => {
  const bookings = await Booking.find().populate('resident room');
  res.json(bookings);
};

const getBookingById = async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate('resident room');
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  res.json(booking);
};

const updateBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });

  Object.assign(booking, req.body);
  await booking.save();
  res.json({ message: 'Booking updated', booking });
};

const deleteBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });

  await booking.deleteOne();
  res.json({ message: 'Booking deleted' });
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};
