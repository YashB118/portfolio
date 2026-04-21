import axios from 'axios';

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'https://portfolio-kh8h.onrender.com').replace(/\/+$/, '');

const api = axios.create({
  baseURL: API_BASE_URL
});

export default api;
