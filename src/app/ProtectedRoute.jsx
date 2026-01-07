import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Loader from '../components/common/Loader'

const ProtectedRoute = ({ children }) => {
  const location = useLocation()
  const auth = useAuth()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // Small delay to ensure auth context is loaded
    const timer = setTimeout(() => {
      setIsChecking(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Show loader while checking or if auth is loading
  if (isChecking || (auth && auth.loading)) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader size="large" text="Verifying authentication..." />
      </div>
    )
  }

  // If auth context is not available yet
  if (!auth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader size="large" text="Loading application..." />
      </div>
    )
  }

  // If user is not authenticated, redirect to login
  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // User is authenticated, render children
  return children
}

export default ProtectedRoute