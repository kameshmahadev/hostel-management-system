// server.js

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());

// CORS setup
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://hostel-backend-1ccr.onrender.com',
    'https://passwordrstflw.netlify.app',
    'https://your-hostel-frontend.netlify.app' // ✅ Add your actual frontend domain when deployed
  ],
  credentials: true
}));

// Route setup
app.use('/api/users', userRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
