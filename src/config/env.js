export const ENV = {
  // Default to mock mode
  USE_MOCK_DATA: true,
  MOCK_DELAY: 500, // Simulate network delay
  
  // Backend URLs (optional for future)
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '',
  WS_URL: import.meta.env.VITE_WS_URL || '',
  
  // App Info
  APP_NAME: 'ScoreSense Africa',
  APP_VERSION: '1.0.0'
}