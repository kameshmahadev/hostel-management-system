import axios from 'axios'; // Import axios

const API = axios.create({
  baseURL: 'https://hostel-management-system-tooc.onrender.com/api', // Ensure "/api" is included
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;