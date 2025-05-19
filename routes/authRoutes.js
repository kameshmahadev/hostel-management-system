const express = require('express');
const { register, login, createUser, updateUser } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/create', createUser);
router.put('/update/:id', updateUser);

module.exports = router;