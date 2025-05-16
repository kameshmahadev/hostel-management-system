// src/api.js or wherever Axios is set up
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://hostel-backend-1ccr.onrender.com', // <-- Update this
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
