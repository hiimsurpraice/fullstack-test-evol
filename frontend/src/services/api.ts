import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(
  (config) => {
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      
      const { status } = error.response;
      if (status === 404) {
        console.error('Resource not found');
      } else if (status === 500) {
        console.error('Server error');
      }
    } else if (error.request) {
      console.error('Network error');
    }
    return Promise.reject(error);
  }
);