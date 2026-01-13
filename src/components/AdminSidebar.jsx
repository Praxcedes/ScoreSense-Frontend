import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Trophy,
  BarChart3,
  Wallet,
  Settings,
  Shield,
  Hammer
} from 'lucide-react'

const AdminSidebar = () => {
  const navItems = [
    { to: '/admin', label: 'Overview', icon: <LayoutDashboard size={18} /> },
    { to: '/admin/tournaments', label: 'Tournaments', icon: <Trophy size={18} /> },
    { to: '/admin/predictions', label: 'Predictions', icon: <BarChart3 size={18} /> },
    { to: '/admin/transactions', label: 'Transactions', icon: <Wallet size={18} /> },
    { to: '/admin/config', label: 'Config', icon: <Settings size={18} /> },
    { to: '/admin/maintenance', label: 'Maintenance', icon: <Hammer size={18} /> }
  ]

  return (
    <aside className="w-64 bg-surface border-r border-card min-h-screen p-6">
      <div className="mb-8">
        <div className="text-lg font-bold">ScoreSense Admin</div>
        <div className="text-xs text-text-secondary mt-1">System controls</div>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/admin'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                isActive ? 'bg-primary text-black' : 'text-text-secondary hover:text-white hover:bg-hover'
              }`
            }
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default AdminSidebar
