// api/client.js
// Centralized axios instance with auth header injection, timeout, and error handling

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, REQUEST_TIMEOUT } from './config';

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — inject auth token if available
client.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — normalize errors
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // Network/timeout error
      return Promise.reject({
        type: 'network',
        message: 'Network error. Please check your connection.',
      });
    }
    const { status, data } = error.response;
    if (status === 401) {
      return Promise.reject({ type: 'auth', message: 'Unauthorized. Please log in again.' });
    }
    if (status === 404) {
      return Promise.reject({ type: 'notfound', message: 'Resource not found.' });
    }
    if (status >= 500) {
      return Promise.reject({ type: 'server', message: 'Server error. Please try again later.' });
    }
    return Promise.reject({
      type: 'validation',
      message: data?.message || 'Something went wrong.',
      errors: data?.errors,
    });
  }
);

export default client;
