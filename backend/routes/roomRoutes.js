const express = require('express');
const router = express.Router();
const { getRooms, addRoom } = require('../controllers/roomController'); // Ensure these functions exist

router.get('/', getRooms);  // ✅ handler is a function
router.post('/', addRoom);  // ✅ handler is a function

module.exports = router;
