// Notification service for sending emails/SMS/in-app alerts
// You can integrate with SendGrid, Twilio, or nodemailer here
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

module.exports = {
  sendEmail: async (to, subject, message) => {
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text: message,
      });
      console.log(`Email sent to ${to}`);
    } catch (err) {
      console.error('Email send error:', err.message);
    }
  },
  sendSMS: async (to, message) => {
    // TODO: Integrate with SMS provider
    console.log(`Sending SMS to ${to}: ${message}`);
  },
  sendInApp: async (userId, message) => {
    // TODO: Implement in-app notification logic
    console.log(`Sending in-app notification to ${userId}: ${message}`);
  }
};
