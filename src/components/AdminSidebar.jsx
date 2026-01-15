import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Users, Trophy, Shield, Database, Settings } from 'lucide-react'
import appLogo from '../assets/ScoreSense Logo.png'

const AdminSidebar = () => {
  const navItems = [
    { path: '/admin', icon: <LayoutDashboard size={18} />, label: 'Overview' },
    { path: '/admin/users', icon: <Users size={18} />, label: 'Users' },
    { path: '/admin/tournaments', icon: <Trophy size={18} />, label: 'Tournaments' },
    { path: '/admin/predictions', icon: <Shield size={18} />, label: 'Predictions' },
    { path: '/admin/transactions', icon: <Database size={18} />, label: 'Transactions' },
    { path: '/admin/settings', icon: <Settings size={18} />, label: 'Settings' }
  ]

  return (
    <aside className="w-64 bg-surface border-r border-card h-screen sticky top-0 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-9 h-9 rounded-lg bg-card border border-border overflow-hidden flex items-center justify-center">
          <img src={appLogo} alt="ScoreSense logo" className="w-full h-full object-contain" />
        </div>
        <div>
          <h2 className="text-lg font-bold">Admin Panel</h2>
          <p className="text-xs text-text-secondary">ScoreSense</p>
        </div>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive ? 'bg-primary/20 text-white' : 'text-text-secondary hover:text-white hover:bg-hover'
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default AdminSidebar
