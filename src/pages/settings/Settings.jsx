import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Shield, Globe, CreditCard, Eye, Moon, Download, Trash2, User, Lock } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

const Settings = () => {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('general')
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    predictions: true,
    marketing: false
  })

  const tabs = [
    { id: 'general', name: 'General', icon: <User size={18} /> },
    { id: 'notifications', name: 'Notifications', icon: <Bell size={18} /> },
    { id: 'security', name: 'Security', icon: <Shield size={18} /> },
    { id: 'privacy', name: 'Privacy', icon: <Eye size={18} /> },
    { id: 'billing', name: 'Billing', icon: <CreditCard size={18} /> }
  ]

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
        <p className="text-text-secondary mt-2">
          Manage your account preferences and security settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card p-4"
          >
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-3 w-full px-3 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'text-text-secondary hover:text-white hover:bg-hover'
                  }`}
                >
                  {tab.icon}
                  <span className="font-medium">{tab.name}</span>
                </button>
              ))}
            </nav>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6"
          >
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold">General Settings</h2>
                
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Display Language
                  </label>
                  <select className="input-field w-full">
                    <option>English</option>
                    <option>Swahili</option>
                    <option>French</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Time Zone
                  </label>
                  <select className="input-field w-full">
                    <option>East Africa Time (EAT)</option>
                    <option>UTC</option>
                    <option>GMT</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-sm text-text-secondary">Use dark theme</p>
                  </div>
                  <button className="p-2 hover:bg-hover rounded-lg">
                    <Moon size={20} />
                  </button>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold">Notifications</h2>
                
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{key.charAt(0).toUpperCase() + key.slice(1)} Notifications</p>
                      <p className="text-sm text-text-secondary">Receive {key} notifications</p>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle(key)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        value ? 'bg-primary' : 'bg-card'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transform transition-transform ${
                        value ? 'translate-x-7' : 'translate-x-1'
                      }`}></div>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Security */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold">Security</h2>
                
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Current Password
                  </label>
                  <input type="password" className="input-field w-full" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    New Password
                  </label>
                  <input type="password" className="input-field w-full" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Confirm New Password
                  </label>
                  <input type="password" className="input-field w-full" />
                </div>

                <button className="btn-primary">Update Password</button>
              </div>
            )}

            {/* Privacy */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold">Privacy Settings</h2>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Profile Visibility</p>
                    <p className="text-sm text-text-secondary">Who can see your profile</p>
                  </div>
                  <select className="input-field w-32">
                    <option>Public</option>
                    <option>Private</option>
                    <option>Friends Only</option>
                  </select>
                </div>

                <div className="pt-6 border-t border-card">
                  <h3 className="font-bold mb-4">Data Export</h3>
                  <button className="btn-secondary w-full flex items-center justify-center space-x-2">
                    <Download size={18} />
                    <span>Export My Data</span>
                  </button>
                </div>
              </div>
            )}

            {/* Billing */}
            {activeTab === 'billing' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold">Billing & Subscription</h2>
                
                <div className="bg-card p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Current Plan</p>
                      <p className="text-sm text-text-secondary">Free Tier</p>
                    </div>
                    <button className="btn-primary">Upgrade to Pro</button>
                  </div>
                </div>

                <div className="pt-6 border-t border-card">
                  <h3 className="font-bold mb-4">Danger Zone</h3>
                  <button
                    onClick={logout}
                    className="btn-danger w-full flex items-center justify-center space-x-2 mb-4"
                  >
                    <span>Logout</span>
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                        // Delete account logic
                      }
                    }}
                    className="w-full p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl hover:bg-red-500/20 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Trash2 size={18} />
                    <span>Delete Account</span>
                  </button>
                  <p className="text-sm text-text-secondary mt-2 text-center">
                    This action cannot be undone
                  </p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Save Changes Button */}
          <div className="flex justify-end mt-6">
            <button className="btn-primary">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings