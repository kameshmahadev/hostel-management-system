const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/authController'); // Ensure these functions exist
const router = express.Router();

// Route to register a new user
router.post('/register', registerUser);

// Route to log in a user
router.post('/login', loginUser);

// Route to log out a user
router.post('/logout', logoutUser);

module.exports = router;