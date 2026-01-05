import React, { createContext, useState, useContext, useEffect } from 'react'
import { toast } from 'react-hot-toast'

export const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

// Mock user - This is what you'll see in the app
const mockUser = {
  id: 'user_001',
  username: 'Juma_Predictor',
  email: 'juma@scoresense.africa',
  avatar: 'JP',
  premium: true,
  rank: 42,
  location: 'Nairobi, Kenya',
  favoriteTeam: 'Gor Mahia',
  bio: 'Sports analyst with 85% accuracy rate. Specialized in football predictions and live match analysis.',
  memberSince: '2022',
  stats: {
    totalPredictions: 1245,
    winRate: 68.4,
    currentStreak: 5,
    bestStreak: 8,
    totalPoints: 2450,
    accuracy: 85,
    rank: 42
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(mockUser) // Start with mock user
  const [loading, setLoading] = useState(false)

  // Auto-login with mock user
  useEffect(() => {
    const timer = setTimeout(() => {
      toast.success(`Welcome back, ${mockUser.username}! 🎯`, {
        duration: 3000,
        icon: '👋'
      })
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const login = async (email, password) => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 800)) // Simulate API delay
    
    setUser(mockUser)
    setLoading(false)
    toast.success('Welcome to ScoreSense Africa!')
    return { success: true }
  }

  const register = async (userData) => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 800))
    
    setLoading(false)
    toast.success('Account created successfully!')
    return { success: true }
  }

  const logout = () => {
    toast.success('Logged out successfully')
    // In real app, this would clear user state
    // For mock, we keep the user logged in
  }

  const updateProfile = async (profileData) => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const updatedUser = { ...user, ...profileData }
    setUser(updatedUser)
    setLoading(false)
    toast.success('Profile updated successfully!')
    return { success: true }
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: true // Always authenticated in mock mode
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}