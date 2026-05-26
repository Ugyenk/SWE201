// api/config.js
// Central API configuration — change API_BASE_URL here or via .env
export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ||
  'https://6a15323191ff9a63de079cfa.mockapi.io';

// Request timeout in milliseconds
export const REQUEST_TIMEOUT = 10000;