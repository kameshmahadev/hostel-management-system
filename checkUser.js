require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User'); // adjust path if needed

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const user = await User.findOne({ email: 'admin2@test.com' });
  console.log(user);
  mongoose.disconnect();
});
