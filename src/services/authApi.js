import axios from "axios"

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  console.log('API Request:', config.method?.toUpperCase(), config.baseURL + config.url)
  console.log('Request Data:', config.data)
  return config
}, (error) => {
  console.error('Request Error:', error)
  return Promise.reject(error)
})

API.interceptors.response.use((response) => {
  console.log('API Response Success:', response.status, response.config.url)
  console.log('Response Data:', response.data)
  return response
}, (error) => {
  console.error('API Response Error Details:')
  console.error('URL:', error.config?.baseURL + error.config?.url)
  console.error('Method:', error.config?.method?.toUpperCase())
  console.error('Status:', error.response?.status)
  console.error('Status Text:', error.response?.statusText)
  console.error('Response Data:', error.response?.data)
  console.error('Error Message:', error.message)
  
  return Promise.reject(error)
})

export const loginUser = (data) =>
  API.post("/auth/login", data)

export const registerUser = (data) =>
  API.post("/auth/register", data)

export const loginAdminUser = (data) =>
  API.post("/auth/admin/login", data)

export const requestAdminAccess = (data) =>
  API.post("/auth/admin/request", data)

export const requestPasswordReset = (email) =>
  API.post("/auth/forgot-password", { email })

export const verifyEmail = (token) =>
  API.post("/auth/verify-email", { token })

export const resendVerificationEmail = (email) =>
  API.post("/auth/resend-verification", { email })

export const logoutUser = () => {
  localStorage.removeItem("accessToken")
  localStorage.removeItem("user")
  localStorage.removeItem("walletAddress")
  localStorage.removeItem("walletConnected")
  window.location.href = "/login"
}
