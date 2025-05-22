// src/api/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://hostel-management-system-tooc.onrender.com/api', // use your production or local backend URL here
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token if exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
