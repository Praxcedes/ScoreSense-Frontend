import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '../context/AuthContext'
import { MatchesProvider } from '../context/MatchesContext'
import { WebSocketProvider } from '../context/WebSocketContext'
import { PointsProvider } from '../context/PointsContext'
import ProtectedRoute from './ProtectedRoute'
import AdminRoute from './AdminRoute'
import SuperAdminRoute from './SuperAdminRoute'
import MainLayout from '../components/layout/MainLayout'
import AdminLayout from '../layouts/AdminLayout'

import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import AdminLogin from '../pages/admin/AdminLogin'
import AdminRequest from '../pages/admin/AdminRequest'

import Dashboard from '../pages/dashboard/Dashboard'
import Matches from '../pages/matches/Matches'
import Community from '../pages/community/Community'
import Stats from '../pages/stats/Stats'
import Profile from '../pages/profile/Profile'
import Settings from '../pages/settings/Settings'
import Points from '../pages/points/Points'
import Notifications from '../pages/notifications/Notifications'
import Predictions from '../pages/predictions/Predictions'
import CoinClash from '../pages/tournaments/CoinClash'

import AdminOverview from '../pages/admin/Overview'
import AdminTournaments from '../pages/admin/Tournaments'
import AdminPredictions from '../pages/admin/Predictions'
import AdminTransactions from '../pages/admin/Transactions'
import AdminConfig from '../pages/admin/Config'
import AdminMaintenance from '../pages/admin/Maintenance'
import AdminRequests from '../pages/admin/AdminRequests'

const App = () => {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <WebSocketProvider>
        <AuthProvider>
          <PointsProvider>
            <MatchesProvider>
              <Toaster 
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#0F2A20',
                    color: '#fff',
                    border: '1px solid #1A3329',
                  },
                }}
              />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/request" element={<AdminRequest />} />

                <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/matches" element={<Matches />} />
                  <Route path="/predictions" element={<Predictions />} />
                  <Route path="/coinclash" element={<CoinClash />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/stats" element={<Stats />} />
                  <Route path="/points" element={<Points />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                </Route>

                <Route element={<AdminRoute><AdminLayout /></AdminRoute>}>
                  <Route path="/admin" element={<AdminOverview />} />
                  <Route path="/admin/overview" element={<AdminOverview />} />
                  <Route path="/admin/tournaments" element={<AdminTournaments />} />
                  <Route path="/admin/predictions" element={<AdminPredictions />} />
                  <Route path="/admin/transactions" element={<AdminTransactions />} />
                  <Route path="/admin/config" element={<AdminConfig />} />
                  <Route path="/admin/maintenance" element={<AdminMaintenance />} />
                  <Route
                    path="/admin/requests"
                    element={
                      <SuperAdminRoute>
                        <AdminRequests />
                      </SuperAdminRoute>
                    }
                  />
                </Route>

                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </MatchesProvider>
          </PointsProvider>
        </AuthProvider>
      </WebSocketProvider>
    </Router>
  )
}

export default App
