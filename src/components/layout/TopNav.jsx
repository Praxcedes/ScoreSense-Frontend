import React, { useState, useRef, useEffect } from 'react'
import { Search, Bell, ChevronDown, Wifi, WifiOff } from 'lucide-react'
import { usePoints } from '../../hooks/usePoints'
import { useAuth } from '../../hooks/useAuth'
import { useWebSocket } from '../../hooks/useWebSocket'
import { motion, AnimatePresence } from 'framer-motion'

const TopNav = () => {
  const { points } = usePoints()
  const { user } = useAuth()
  const { isConnected, notifications } = useWebSocket()
  const [searchQuery, setSearchQuery] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const notificationsRef = useRef(null)
  const profileRef = useRef(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const unreadNotifications = notifications.filter(n => !n.read).length

  return (
    <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-card px-4 md:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Side */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={20} />
            <input
              type="text"
              placeholder="Search matches, teams, or players..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-card border border-card rounded-xl text-white placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Connection Status */}
          <div className={`hidden md:flex items-center space-x-2 px-3 py-2 rounded-lg ${
            isConnected ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
          }`}>
            {isConnected ? <Wifi size={16} /> : <WifiOff size={16} />}
            <span className="text-sm font-medium">
              {isConnected ? 'Live' : 'Offline'}
            </span>
          </div>

          {/* Points Display */}
          <div className="hidden md:flex items-center space-x-2 bg-card px-4 py-2.5 rounded-xl border border-card">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <div>
              <span className="text-sm text-text-secondary">Points</span>
              <p className="font-bold text-lg">{points.toLocaleString()}</p>
            </div>
          </div>

          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-hover rounded-lg transition-colors"
            >
              <Bell className="text-text-secondary" size={22} />
              {unreadNotifications > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-80 bg-surface rounded-xl shadow-2xl border border-card overflow-hidden z-50"
                >
                  <div className="p-4 border-b border-card">
                    <h3 className="font-semibold">Notifications</h3>
                    <p className="text-sm text-text-secondary mt-1">{unreadNotifications} unread</p>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map(notification => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-card hover:bg-hover cursor-pointer ${
                            !notification.read ? 'bg-primary/5' : ''
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">{notification.title}</h4>
                            <span className="text-xs text-text-secondary">{notification.time}</span>
                          </div>
                          <p className="text-sm text-text-secondary mt-1">{notification.message}</p>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <Bell className="mx-auto text-text-secondary" size={32} />
                        <p className="text-text-secondary mt-2">No notifications yet</p>
                      </div>
                    )}
                  </div>
                  <div className="p-3 border-t border-card">
                    <button className="w-full text-center text-primary hover:text-primary/80 text-sm font-medium">
                      Mark all as read
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Menu */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-3 p-2 hover:bg-hover rounded-xl transition-colors"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-card to-hover rounded-full flex items-center justify-center">
                <span className="font-bold">{user?.username?.charAt(0) || 'U'}</span>
              </div>
              <div className="hidden lg:block text-left">
                <p className="font-semibold text-sm">{user?.username || 'User'}</p>
                <p className="text-xs text-text-secondary">#{user?.rank || 'Unranked'}</p>
              </div>
              <ChevronDown className="text-text-secondary" size={20} />
            </button>

            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-48 bg-surface rounded-xl shadow-2xl border border-card overflow-hidden z-50"
                >
                  <div className="p-4 border-b border-card">
                    <p className="font-semibold">{user?.username}</p>
                    <p className="text-sm text-text-secondary">{user?.email}</p>
                  </div>
                  <div className="p-2">
                    <button className="w-full text-left px-3 py-2.5 hover:bg-hover rounded-lg text-sm transition-colors">
                      View Profile
                    </button>
                    <button className="w-full text-left px-3 py-2.5 hover:bg-hover rounded-lg text-sm transition-colors">
                      Settings
                    </button>
                    <button className="w-full text-left px-3 py-2.5 hover:bg-hover rounded-lg text-sm transition-colors">
                      Help & Support
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  )
}

export default TopNav