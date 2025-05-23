const Booking = require('../models/Booking');
const AppError = require('../utils/AppError');

const createBooking = async (req, res, next) => {
  try {
    const { room, startDate, endDate } = req.body;

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
      return next(new AppError('Room is already booked for the selected dates.', 400));
    }

    const booking = await Booking.create({
      resident: req.user._id,
      room,
      startDate,
      endDate,
    });

    res.status(201).json({ message: 'Booking created', booking });
  } catch (err) {
    next(err);
  }
};

const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find().populate('resident room');
    res.json(bookings);
  } catch (err) {
    next(err);
  }
};

const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('resident room');
    if (!booking) return next(new AppError('Booking not found', 404));
    res.json(booking);
  } catch (err) {
    next(err);
  }
};

const updateBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return next(new AppError('Booking not found', 404));

    Object.assign(booking, req.body);
    await booking.save();
    res.json({ message: 'Booking updated', booking });
  } catch (err) {
    next(err);
  }
};

const deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return next(new AppError('Booking not found', 404));

    await booking.deleteOne();
    res.json({ message: 'Booking deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};
