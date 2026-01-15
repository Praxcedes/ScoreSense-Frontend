import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const SuperAdminRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return null
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  if (user.role !== 'superadmin') {
    return <Navigate to="/admin" replace />
  }

  return children
}

export default SuperAdminRoute
