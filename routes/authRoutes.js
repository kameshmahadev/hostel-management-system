const express = require('express');
const { loginUser } = require('../controllers/authController');

const router = express.Router();

// POST /api/auth/login - Login route
router.post('/login', loginUser);

module.exports = router;
