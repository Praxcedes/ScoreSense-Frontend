import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '../context/AuthContext'
import { PointsProvider } from '../context/PointsContext'
import { WebSocketProvider } from '../context/WebSocketContext'
import { MatchesProvider } from '../context/MatchesContext'
import MainLayout from '../components/layout/MainLayout'

// Pages
import Dashboard from '../pages/dashboard/Dashboard'
import Matches from '../pages/matches/Matches'
import Community from '../pages/community/Community'
import Stats from '../pages/stats/Stats'
import Profile from '../pages/profile/Profile'
import Settings from '../pages/settings/Settings'
import Points from '../pages/points/Points'

// Demo Page
import DemoWelcome from '../pages/demo/DemoWelcome'

function App() {
  return (
    <Router>
      <AuthProvider>
        <PointsProvider>
          <WebSocketProvider>
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
                {/* Demo Welcome Page */}
                <Route path="/" element={<DemoWelcome />} />
                
                {/* Main App (already logged in) */}
                <Route element={<MainLayout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/matches" element={<Matches />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/stats" element={<Stats />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/points" element={<Points />} />
                </Route>
                
                {/* Fallback to demo */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </MatchesProvider>
          </WebSocketProvider>
        </PointsProvider>
      </AuthProvider>
    </Router>
  )
}

export default App