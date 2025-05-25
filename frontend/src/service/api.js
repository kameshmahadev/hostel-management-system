import axios from 'axios';
import toast from 'react-hot-toast';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust as per your backend
});

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || 'Something went wrong';

    toast.error(message);

    if (status === 401 || status === 403) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login'; // force redirect
    }

    return Promise.reject(error);
  }
);

export default instance;
