// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register controller
const registerUser = async (req, res) => {
  console.log('Received body:', req.body);
  
  const { username, name, email, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// Login controller (placeholder)
const loginUser = async (req, res) => {
  // your existing login logic
};

module.exports = {
  registerUser,
  loginUser,
};
