const express = require('express');
const router = express.Router();
const {
  getAllBookings,
  createBooking,
  updateBooking,
  deleteBooking
} = require('../controllers/bookingController');

const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getAllBookings)
  .post(protect, authorizeRoles('admin', 'staff'), createBooking);

router.route('/:id')
  .put(protect, authorizeRoles('admin', 'staff'), updateBooking)
  .delete(protect, authorizeRoles('admin'), deleteBooking);

module.exports = router;
