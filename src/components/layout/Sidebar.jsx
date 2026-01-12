import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { usePoints } from '../../hooks/usePoints'
import { 
  LayoutDashboard,
  Trophy,
  Users,
  BarChart3,
  Wallet,
  User,
  Settings,
  LogOut,
  TrendingUp,
  Crown,
  Bell,
  Target,
  Award
} from 'lucide-react'
import { motion } from 'framer-motion'

const Sidebar = () => {
  const { user, logout } = useAuth()
  const { points } = usePoints()

  const navItems = [
    { path: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/matches', icon: <Trophy size={20} />, label: 'Matches' },
    { path: '/predictions', icon: <Target size={20} />, label: 'Predictions' },
    { path: "/coinclash", icon: <Award size={20} />, label: "CoinClash" },
    { path: '/community', icon: <Users size={20} />, label: 'Community' },
    { path: '/stats', icon: <BarChart3 size={20} />, label: 'Stats' },
    { path: '/points', icon: <Wallet size={20} />, label: 'Points' },
    { path: '/notifications', icon: <Bell size={20} />, label: 'Notifications' },
    { path: '/profile', icon: <User size={20} />, label: 'Profile' },
    { path: '/settings', icon: <Settings size={20} />, label: 'Settings' }
  ]

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="w-64 bg-surface border-r border-card h-screen sticky top-0 overflow-y-auto"
    >
      {/* Logo */}
      <div className="p-6 border-b border-card">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-green-400 rounded-xl flex items-center justify-center">
            <Trophy className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-primary/80 bg-clip-text text-transparent">
              ScoreSense
            </h1>
            <p className="text-xs text-text-secondary">Africa</p>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-card">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-card to-hover rounded-full flex items-center justify-center">
              <span className="text-lg font-bold">{user?.username?.charAt(0) || 'U'}</span>
            </div>
            {user?.premium && (
              <div className="absolute -top-1 -right-1">
                <Crown className="text-yellow-500" size={16} />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold truncate">{user?.username || 'User'}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm text-text-secondary">{points.toLocaleString()} PTS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-4 border-b border-card">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Win Rate</span>
            <span className="text-sm font-semibold text-primary">68.4%</span>
          </div>
          <div className="w-full bg-card rounded-full h-2">
            <div className="h-2 bg-primary rounded-full" style={{ width: '68.4%' }}></div>
          </div>
          <div className="flex items-center justify-between text-xs text-text-secondary">
            <span>Rank #42</span>
            <span>↑ 5</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-hover text-primary border-l-4 border-primary'
                      : 'text-text-secondary hover:bg-hover hover:text-white'
                  }`
                }
              >
                <span>{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-card mt-auto">
        <button
          onClick={logout}
          className="flex items-center space-x-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </motion.aside>
  )
}

export default Sidebar