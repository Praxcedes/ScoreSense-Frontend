import axios from 'axios'
import { ENV, API_ENDPOINTS } from '../config/env.js'

// Create axios instance with configuration
const api = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: ENV.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ENV.TOKEN_KEY)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // Add app version header
    config.headers['X-App-Version'] = ENV.APP_VERSION
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for handling tokens and errors
api.interceptors.response.use(
  (response) => {
    // You can transform response data here if needed
    return response.data
  },
  async (error) => {
    const originalRequest = error.config
    
    // Handle 401 Unauthorized - Token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      try {
        const refreshToken = localStorage.getItem(ENV.REFRESH_TOKEN_KEY)
        if (!refreshToken) {
          // No refresh token, logout user
          localStorage.removeItem(ENV.TOKEN_KEY)
          localStorage.removeItem(ENV.REFRESH_TOKEN_KEY)
          window.location.href = '/login'
          return Promise.reject(error)
        }
        
        // Try to refresh token
        const response = await axios.post(
          `${ENV.API_BASE_URL}${API_ENDPOINTS.AUTH.REFRESH}`,
          { refreshToken }
        )
        
        const { token, refreshToken: newRefreshToken } = response.data
        
        // Store new tokens
        localStorage.setItem(ENV.TOKEN_KEY, token)
        if (newRefreshToken) {
          localStorage.setItem(ENV.REFRESH_TOKEN_KEY, newRefreshToken)
        }
        
        // Update authorization header
        originalRequest.headers.Authorization = `Bearer ${token}`
        
        // Retry original request
        return api(originalRequest)
      } catch (refreshError) {
        // Refresh failed, logout user
        localStorage.removeItem(ENV.TOKEN_KEY)
        localStorage.removeItem(ENV.REFRESH_TOKEN_KEY)
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }
    
    // Handle other errors
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.error || 
                        error.message || 
                        'An error occurred'
    
    // You can add specific error handling here
    switch (error.response?.status) {
      case 400:
        console.error('Bad Request:', errorMessage)
        break
      case 403:
        console.error('Forbidden:', errorMessage)
        break
      case 404:
        console.error('Not Found:', errorMessage)
        break
      case 422:
        console.error('Validation Error:', errorMessage)
        break
      case 500:
        console.error('Server Error:', errorMessage)
        break
      default:
        console.error('Error:', errorMessage)
    }
    
    return Promise.reject({
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data
    })
  }
)

// Helper function to build URL with params
export const buildUrl = (endpoint, params = {}) => {
  let url = endpoint
  
  // Replace path parameters
  Object.keys(params).forEach(key => {
    if (url.includes(`:${key}`)) {
      url = url.replace(`:${key}`, params[key])
      delete params[key]
    }
  })
  
  return url
}

// Helper function to make API calls
export const apiCall = async (method, endpoint, data = {}, params = {}) => {
  const url = buildUrl(endpoint, params)
  
  try {
    const response = await api({
      method,
      url,
      data: method !== 'GET' ? data : undefined,
      params: method === 'GET' ? data : params
    })
    
    return response
  } catch (error) {
    throw error
  }
}

export default api