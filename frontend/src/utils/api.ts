import axios from "axios";
import toast from "react-hot-toast";

// ✅ Central Axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

// ✅ Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Friendly Error Message Mapper
export function getFriendlyErrorMessage(error) {
  const status = error.response?.status;
  const msg = error.response?.data?.message;

  if (!error.response) return "Network error. Please check your connection.";

  switch (status) {
    case 400:
      return msg || "Invalid request. Please check your input.";
    case 401:
      return "You are not authorized. Please log in again.";
    case 403:
      return "Access denied. You don’t have permission.";
    case 404:
      return "Requested resource not found.";
    case 409:
      return msg || "Conflict. This data may already exist.";
    case 500:
      return "Internal server error. Try again later.";
    default:
      return msg || "Unexpected error occurred.";
  }
}

// ✅ Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = getFriendlyErrorMessage(error);

    toast.error(message);

    if (status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;