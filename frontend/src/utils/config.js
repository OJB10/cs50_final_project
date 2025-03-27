/**
 * Application Configuration
 * 
 * This file contains centralized configuration settings for the Dash application.
 * It manages environment-specific settings and provides a consistent configuration interface.
 */

// Default to development API if not specified
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000/api';

// Export API URL for use throughout the application
export { API_BASE_URL };

// Export configuration object
export default {
  // API configuration
  api: {
    baseUrl: API_BASE_URL,
    timeout: 30000, // Default request timeout (ms)
  },
  
  // Authentication settings
  auth: {
    storageKey: 'user', // Local storage key for user data
    sessionDuration: 7, // Days before session expires
  },
  
  // Application settings
  app: {
    name: 'Dash Ticketing',
    version: '1.0.0',
  }
};