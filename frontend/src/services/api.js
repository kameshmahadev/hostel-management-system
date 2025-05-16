// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://hostel-backend-1ccr.onrender.com/api', // ✅ Correct: General API base
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
