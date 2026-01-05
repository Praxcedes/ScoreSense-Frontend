export const ENV = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://api.scoresense.africa',
  WS_URL: import.meta.env.VITE_WS_URL || 'wss://api.scoresense.africa',
  APP_NAME: 'ScoreSense Africa',
  APP_VERSION: '1.0.0',
  ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT || 'development'
}

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/auth/profile',
    LOGOUT: '/auth/logout'
  },
  MATCHES: {
    LIVE: '/matches/live',
    UPCOMING: '/matches/upcoming',
    FEATURED: '/matches/featured',
    DETAILS: '/matches/:id',
    STATS: '/matches/:id/stats'
  },
  POINTS: {
    BALANCE: '/points/balance',
    TRANSACTIONS: '/points/transactions',
    LEADERBOARD: '/points/leaderboard',
    PREDICT: '/points/predict',
    BONUS: '/points/bonus'
  },
  COMMUNITY: {
    POSTS: '/community/posts',
    COMMENTS: '/community/comments',
    TRENDING: '/community/trending'
  }
}