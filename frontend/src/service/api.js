// src/service/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://your-backend-url.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;