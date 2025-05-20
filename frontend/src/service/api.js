// src/service/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://localhost:5000.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;