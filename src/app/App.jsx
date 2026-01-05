import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '../context/AuthContext'
import { WebSocketProvider } from '../context/WebSocketContext'
import { PointsProvider } from '../context/PointsContext'
import { MatchesProvider } from '../context/MatchesContext'
import ProtectedRoute from './ProtectedRoute'
import MainLayout from '../components/layout/MainLayout'

// Auth Pages - MUST import them as default
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'

// Main Pages
import Dashboard from '../pages/dashboard/Dashboard'
import Matches from '../pages/matches/Matches'
import Community from '../pages/community/Community'
import Stats from '../pages/stats/Stats'
import Profile from '../pages/profile/Profile'
import Settings from '../pages/settings/Settings'
import Points from '../pages/points/Points'
import Notifications from '../pages/notifications/Notifications'
import Predictions from '../pages/predictions/Predictions'
import Tournaments from '../pages/tournaments/Tournaments'

// Default export is required
const App = () => {
  return (
    <Router>
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
                
                <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/matches" element={<Matches />} />
                  <Route path="/predictions" element={<Predictions />} />
                  <Route path="/tournaments" element={<Tournaments />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/stats" element={<Stats />} />
                  <Route path="/points" element={<Points />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
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