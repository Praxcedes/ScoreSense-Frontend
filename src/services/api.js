import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? '/api' : undefined)

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const isLoginPage = window.location.pathname === '/login'
    const isRegisterPage = window.location.pathname === '/register'

    if (error.response && error.response.status === 401 && !isLoginPage && !isRegisterPage) {
      console.log('API 401 error, redirecting to login...')
      localStorage.removeItem('accessToken')
      window.location.href = '/login'
      return Promise.reject(new Error('Unauthorized'))
    }

    if (error.response && error.response.data) {
      return error.response.data
    }

    if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
      console.error('Network/CORS error:', error)
      return { success: false, error: 'Network error. Using mock data.' }
    }

    const errorMessage = error.response?.data || error.message || 'Unknown error'
    return Promise.reject(errorMessage)
  }
)

export default api
