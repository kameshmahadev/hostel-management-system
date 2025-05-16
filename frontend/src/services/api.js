import axios from "axios";

// Configure Axios instance
const api = axios.create({
  baseURL: "https://hostel-management-system-tooc.onrender.com/api",
  withCredentials: true,
});

export default api;