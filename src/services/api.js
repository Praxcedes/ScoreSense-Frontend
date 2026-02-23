import axios from 'axios'

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? '/api' : undefined)

/*
  Toggle logs with:
  VITE_API_DEBUG=true
*/
const API_DEBUG = String(import.meta.env.VITE_API_DEBUG || '').toLowerCase() === 'true'

if (API_DEBUG) {
  console.log('[API BOOT]', {
    MODE: import.meta.env.MODE,
    DEV: import.meta.env.DEV,
    PROD: import.meta.env.PROD,
    VITE_API_URL: import.meta.env.VITE_API_URL,
    API_BASE_URL
  })
}

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

    if (API_DEBUG) {
      console.log('[API REQUEST]', {
        method: (config.method || 'GET').toUpperCase(),
        url: `${config.baseURL || ''}${config.url || ''}`,
        hasToken: Boolean(token),
        params: config.params || null,
        data: config.data || null
      })
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    if (API_DEBUG) console.error('[API REQUEST ERROR]', error)
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    if (API_DEBUG) {
      console.log('[API RESPONSE]', {
        status: response.status,
        url: `${response.config.baseURL || ''}${response.config.url || ''}`,
        data: response.data
      })
    }

    // Keep original behavior so the app doesn't break
    return response.data
  },
  (error) => {
    const res = error.response
    const isLoginPage = window.location.pathname === '/login'
    const isRegisterPage = window.location.pathname === '/register'

    if (API_DEBUG) {
      console.error('[API RESPONSE ERROR]', {
        message: error.message,
        code: error.code,
        status: res?.status,
        url: `${error.config?.baseURL || ''}${error.config?.url || ''}`,
        data: res?.data
      })
    }

    if (res && res.status === 401 && !isLoginPage && !isRegisterPage) {
      console.log('API 401 error, redirecting to login...')
      localStorage.removeItem('accessToken')
      window.location.href = '/login'
      return Promise.reject(new Error('Unauthorized'))
    }

    if (res && res.data) {
      return res.data
    }

    if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
      console.error('Network/CORS error:', error)
      return { success: false, error: 'Network error. Using mock data.' }
    }

    const errorMessage = res?.data || error.message || 'Unknown error'
    return Promise.reject(errorMessage)
  }
)

export default api
