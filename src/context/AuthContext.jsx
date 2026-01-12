import React, { createContext, useContext, useState, useEffect } from 'react'
import { loginUser, registerUser } from '../services/authApi'
import { toast } from 'react-hot-toast'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = () => {
    const token = localStorage.getItem('accessToken')
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (error) {
        console.error('Error parsing user data:', error)
        localStorage.removeItem('accessToken')
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }

  const login = async (email, password) => {
    try {
      setLoading(true)
      const response = await loginUser({ email, password })
      
      if (response.data?.access_token) {
        const token = response.data.access_token
        const userData = response.data.user || { email, name: email.split('@')[0] }
        
        localStorage.setItem('accessToken', token)
        localStorage.setItem('user', JSON.stringify(userData))
        
        setUser(userData)
        toast.success('Login successful')
        return { success: true, user: userData }
      } else {
        throw new Error('Invalid response from server')
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || 'Login failed'
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData) => {
    try {
      setLoading(true)
      const response = await registerUser(userData)
      
      if (response.data?.access_token) {
        const token = response.data.access_token
        const newUser = response.data.user || { 
          email: userData.email, 
          name: userData.username || userData.email.split('@')[0] 
        }
        
        localStorage.setItem('accessToken', token)
        localStorage.setItem('user', JSON.stringify(newUser))
        
        setUser(newUser)
        toast.success('Registration successful')
        return { success: true, user: newUser }
      } else {
        throw new Error('Invalid response from server')
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || 'Registration failed'
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    setUser(null)
    toast.success('Logged out successfully')
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
