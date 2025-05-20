// src/service/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://hostel-management-system-tooc.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;