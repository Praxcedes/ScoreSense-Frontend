import React, { createContext, useContext, useState, useEffect } from 'react'
import { loginUser, registerUser, loginAdminUser, requestAdminAccess as requestAdminAccessApi } from '../services/authApi'
import { userService } from '../services/user.service'
import { toast } from 'react-hot-toast'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const setUserAndStore = (nextUser) => {
    setUser(nextUser)
    localStorage.setItem('user', JSON.stringify(nextUser))
  }

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('accessToken')
    const userData = localStorage.getItem('user')

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        try {
          const response = await userService.getCurrentUser()
          if (response?.user) {
            setUserAndStore(response.user)
            setLoading(false)
            return
          }
        } catch (error) {
          console.error('Error fetching current user:', error)
        }
        setUser(parsedUser)
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
        setUserAndStore(userData)
        try {
          const response = await userService.getCurrentUser()
          if (response?.user) {
            setUserAndStore(response.user)
          }
        } catch (error) {
          console.error('Error fetching current user after login:', error)
        }
        toast.success('Login successful')
        return { success: true, user: userData }
      }

      throw new Error('Invalid response from server')
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || 'Login failed'
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const loginAdmin = async ({ email, password, adminSecret }) => {
    try {
      setLoading(true)
      const response = await loginAdminUser({ email, password, admin_secret: adminSecret })

      if (response.data?.access_token) {
        const token = response.data.access_token
        const userData = response.data.user || { email, name: email.split('@')[0], role: 'admin' }

        localStorage.setItem('accessToken', token)
        setUserAndStore(userData)
        try {
          const response = await userService.getCurrentUser()
          if (response?.user) {
            setUserAndStore(response.user)
          }
        } catch (error) {
          console.error('Error fetching current user after admin login:', error)
        }
        toast.success('Admin login successful')
        return { success: true, user: userData }
      }

      throw new Error('Invalid response from server')
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || 'Admin login failed'
      toast.error(errorMessage)
      return { success: false, error: errorMessage, status: error.response?.status }
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
        setUserAndStore(newUser)
        try {
          const response = await userService.getCurrentUser()
          if (response?.user) {
            setUserAndStore(response.user)
          }
        } catch (error) {
          console.error('Error fetching current user after register:', error)
        }
        toast.success('Registration successful')
        return { success: true, user: newUser }
      }

      throw new Error('Invalid response from server')
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || 'Registration failed'
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (profileUpdates) => {
    try {
      const response = await userService.updateProfile(profileUpdates)
      if (response?.user) {
        setUserAndStore(response.user)
        toast.success('Profile updated')
        return { success: true, user: response.user }
      }
      throw new Error('Profile update failed')
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || 'Profile update failed'
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const uploadAvatar = async (file) => {
    try {
      const response = await userService.uploadAvatar(file)
      const avatarUrl = response?.avatar_url || response?.avatarUrl
      if (avatarUrl) {
        const nextUser = { ...user, avatarUrl }
        setUserAndStore(nextUser)
        try {
          const refreshed = await userService.getCurrentUser()
          if (refreshed?.user) {
            setUserAndStore(refreshed.user)
          }
        } catch (error) {
          console.error('Error refreshing user after avatar upload:', error)
        }
        toast.success('Avatar updated')
        return { success: true, avatarUrl }
      }
      throw new Error('Avatar update failed')
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || 'Avatar update failed'
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const updatePassword = async (payload) => {
    try {
      const response = await userService.updatePassword(payload)
      if (response?.success) {
        toast.success('Password updated')
        return { success: true }
      }
      throw new Error(response?.error || 'Password update failed')
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || 'Password update failed'
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const requestAdminAccess = async (payload) => {
    try {
      setLoading(true)
      const response = await requestAdminAccessApi(payload)
      if (response.data?.success) {
        toast.success(response.data.message || 'Admin request submitted')
        return { success: true }
      }
      throw new Error(response.data?.error || 'Admin request failed')
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || 'Admin request failed'
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
    loginAdmin,
    register,
    updateProfile,
    uploadAvatar,
    updatePassword,
    requestAdminAccess,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
