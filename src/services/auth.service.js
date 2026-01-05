import { apiCall, buildUrl } from './api'
import { API_ENDPOINTS, ENV } from '../config/env.js'

export const authService = {
  // Login user
  async login(email, password) {
    try {
      const response = await apiCall('POST', API_ENDPOINTS.AUTH.LOGIN, {
        email,
        password
      })
      
      // Store tokens
      if (response.token) {
        localStorage.setItem(ENV.TOKEN_KEY, response.token)
      }
      if (response.refreshToken) {
        localStorage.setItem(ENV.REFRESH_TOKEN_KEY, response.refreshToken)
      }
      
      return response
    } catch (error) {
      throw error
    }
  },
  
  // Register new user
  async register(userData) {
    try {
      const response = await apiCall('POST', API_ENDPOINTS.AUTH.REGISTER, userData)
      return response
    } catch (error) {
      throw error
    }
  },
  
  // Get user profile
  async getProfile() {
    try {
      const response = await apiCall('GET', API_ENDPOINTS.AUTH.PROFILE)
      return response
    } catch (error) {
      throw error
    }
  },
  
  // Update user profile
  async updateProfile(profileData) {
    try {
      const response = await apiCall('PUT', API_ENDPOINTS.USERS.UPDATE_PROFILE, profileData)
      return response
    } catch (error) {
      throw error
    }
  },
  
  // Logout user
  async logout() {
    try {
      await apiCall('POST', API_ENDPOINTS.AUTH.LOGOUT)
    } catch (error) {
      // Continue with local logout even if API fails
      console.error('Logout API error:', error)
    } finally {
      // Always clear local storage
      localStorage.removeItem(ENV.TOKEN_KEY)
      localStorage.removeItem(ENV.REFRESH_TOKEN_KEY)
    }
  },
  
  // Refresh token
  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem(ENV.REFRESH_TOKEN_KEY)
      if (!refreshToken) {
        throw new Error('No refresh token available')
      }
      
      const response = await apiCall('POST', API_ENDPOINTS.AUTH.REFRESH, {
        refreshToken
      })
      
      // Store new tokens
      if (response.token) {
        localStorage.setItem(ENV.TOKEN_KEY, response.token)
      }
      if (response.refreshToken) {
        localStorage.setItem(ENV.REFRESH_TOKEN_KEY, response.refreshToken)
      }
      
      return response
    } catch (error) {
      throw error
    }
  },
  
  // Forgot password
  async forgotPassword(email) {
    try {
      const response = await apiCall('POST', API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email })
      return response
    } catch (error) {
      throw error
    }
  },
  
  // Reset password
  async resetPassword(token, password) {
    try {
      const response = await apiCall('POST', API_ENDPOINTS.AUTH.RESET_PASSWORD, {
        token,
        password
      })
      return response
    } catch (error) {
      throw error
    }
  }
}