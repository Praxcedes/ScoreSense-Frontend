import axios from 'axios'

const API_BASE_URL = import.meta.env.DEV ? '/api' : import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Check if we're already on login page to prevent redirect loop
    const isLoginPage = window.location.pathname === '/login'
    const isRegisterPage = window.location.pathname === '/register'
    
    if (error.response && error.response.status === 401 && !isLoginPage && !isRegisterPage) {
      console.log('API 401 error, redirecting to login...')
      localStorage.removeItem('accessToken')
      window.location.href = '/login'
      return Promise.reject(new Error('Unauthorized'))
    }
    
    // For CORS errors, check if we got a response
    if (error.response && error.response.data) {
      return error.response.data
    }
    
    // For network errors (CORS, etc.)
    if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
      console.error('Network/CORS error:', error)
      // Return mock data for development
      return { success: false, error: 'Network error. Using mock data.' }
    }
    
    // For other errors
    const errorMessage = error.response?.data || error.message || 'Unknown error'
    return Promise.reject(errorMessage)
  }
)

export default api
