import axios from "axios";

// Configure Axios instance
const api = axios.create({
  baseURL: "http://localhost:3000", // Replace with your backend URL
  withCredentials: true, // Include credentials if needed
});

export default api;