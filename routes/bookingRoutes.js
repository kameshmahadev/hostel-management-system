const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} = require('../controllers/bookingController');

const router = express.Router();

router.route('/')
  .post(protect, createBooking)
  .get(protect, getAllBookings);

router.route('/:id')
  .get(protect, getBookingById)
  .put(protect, updateBooking)
  .delete(protect, deleteBooking);

module.exports = router;
