import axios from 'axios';

// Ensure a valid base URL
const apiURL = import.meta.env.VITE_API_URL || 'http://localhost:3005';

// Trim any trailing slashes to prevent double slashes
const cleanBaseURL = apiURL.replace(/\/+$/, '');

export const API = axios.create({
  baseURL: cleanBaseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Debug logging
console.log('Configured Base URL:', cleanBaseURL);

API.interceptors.request.use((config) => {
  const cookies = document.cookie
    .split('; ')
    .find((row) => row.startsWith('userInfo='));
  const token = cookies ? decodeURIComponent(cookies.split('=')[1]) : null;
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  
  // Log the full request URL for debugging
//   console.log('Full Request URL:', config.baseURL + config.url);
  
  return config;
}, (error) => {
  console.error('Request Error:', error);
  return Promise.reject(error);
});