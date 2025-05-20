import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const login = async (credentials) => {
  const res = await API.post('/auth/login', credentials);
  if (res.data.token) {
    localStorage.setItem('token', res.data.token);
  }
  return res.data;
};

export const register = async (data) => {
  return await API.post('/auth/register', data);
};

export const logout = () => {
  localStorage.removeItem('token');
};
