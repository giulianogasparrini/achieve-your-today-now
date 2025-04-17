
import axios from 'axios';

// Create a base axios instance with common configuration
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // You could add auth token here from localStorage
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors here
    if (error.response) {
      // Client received an error response (5xx, 4xx)
      console.error('API error:', error.response.status, error.response.data);
      
      // Handle 401 Unauthorized
      if (error.response.status === 401) {
        // Redirect to login or refresh token
        // window.location.href = '/login';
      }
    } else if (error.request) {
      // Client never received a response
      console.error('Network error:', error.request);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;
