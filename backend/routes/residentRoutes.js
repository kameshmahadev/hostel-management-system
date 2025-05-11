const express = require('express');
const router = express.Router();
const {
  getAllResidents,
  getResident,
  createResident,
  updateResident,
  deleteResident
} = require('../controllers/residentController');

const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.route('/').get(protect, getAllResidents).post(protect, authorizeRoles('admin'), createResident);
router.route('/:id')
  .get(protect, getResident)
  .put(protect, authorizeRoles('admin'), updateResident)
  .delete(protect, authorizeRoles('admin'), deleteResident);

module.exports = router;
