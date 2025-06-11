const express = require('express');
const router = express.Router();
const paymentGateway = require('../utils/paymentGateway');
const notificationService = require('../utils/notificationService');
const User = require('../models/User');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// Create Stripe payment intent
router.post('/payments/intent', protect, async (req, res) => {
  const { amount, currency, description } = req.body;
  const result = await paymentGateway.processPayment({ amount, currency, description });
  if (result.success) {
    res.json({ clientSecret: result.clientSecret });
  } else {
    res.status(400).json({ error: result.error });
  }
});

// Send email notification
router.post('/notify/email', protect, authorizeRoles('admin', 'staff'), async (req, res) => {
  const { to, subject, message } = req.body;
  try {
    await notificationService.sendEmail(to, subject, message);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user role
router.put('/users/:id/role', protect, authorizeRoles('admin'), async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, { role }, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
