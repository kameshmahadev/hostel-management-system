// routes/roomRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllRooms,
  createRoom
} = require('../controllers/roomController'); // ✅ Correct names now

router.get('/', getAllRooms);  // ✅ Works now
router.post('/', createRoom);  // ✅ Works now

module.exports = router;
