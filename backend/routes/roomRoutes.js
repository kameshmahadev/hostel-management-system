const express = require('express');
const { getRooms, addRoom } = require('../controllers/roomController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// Public route (no authentication needed)
router.get('/', getRooms);

// Admin only route (authentication + authorization needed)
router.post('/', protect, adminOnly, addRoom);

module.exports = router;
