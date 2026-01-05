import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bell,
  BellOff,
  CheckCircle,
  XCircle,
  Trophy,
  TrendingUp,
  Users,
  Gift,
  Clock,
  Filter,
  Trash2,
  Settings,
  CheckCheck,
  AlertTriangle,
  Star,
  Shield,
  Zap
} from 'lucide-react'
import { useWebSocket } from '../../hooks/useWebSocket'

const Notifications = () => {
  const { notifications: wsNotifications } = useWebSocket()
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'prediction_result',
      title: 'Prediction Won!',
      message: 'Your prediction on Gor Mahia vs AFC Leopards was correct!',
      points: 120,
      read: false,
      timestamp: 'Just now',
      icon: <Trophy className="text-yellow-400" />,
      color: 'yellow'
    },
    {
      id: 2,
      type: 'match_start',
      title: 'Match Started',
      message: 'Manchester City vs Arsenal has started. Live updates available.',
      read: false,
      timestamp: '5 minutes ago',
      icon: <Zap className="text-green-400" />,
      color: 'green'
    },
    {
      id: 3,
      type: 'community',
      title: 'New Follower',
      message: 'PredictorPro started following you. Check out their predictions.',
      read: true,
      timestamp: '1 hour ago',
      icon: <Users className="text-blue-400" />,
      color: 'blue'
    },
    {
      id: 4,
      type: 'points',
      title: 'Daily Bonus',
      message: 'You received 50 points for your daily login streak.',
      points: 50,
      read: true,
      timestamp: '2 hours ago',
      icon: <Gift className="text-purple-400" />,
      color: 'purple'
    },
    {
      id: 5,
      type: 'achievement',
      title: 'Achievement Unlocked',
      message: 'You earned the "Perfect Week" achievement!',
      read: true,
      timestamp: '1 day ago',
      icon: <Star className="text-orange-400" />,
      color: 'orange'
    },
    {
      id: 6,
      type: 'system',
      title: 'System Update',
      message: 'New prediction features available. Check them out!',
      read: true,
      timestamp: '2 days ago',
      icon: <Shield className="text-gray-400" />,
      color: 'gray'
    }
  ])

  const [filter, setFilter] = useState('all')
  const [showSettings, setShowSettings] = useState(false)

  const notificationTypes = [
    { id: 'all', name: 'All', count: notifications.length },
    { id: 'unread', name: 'Unread', count: notifications.filter(n => !n.read).length },
    { id: 'prediction', name: 'Predictions', icon: <Trophy size={16} /> },
    { id: 'match', name: 'Matches', icon: <Zap size={16} /> },
    { id: 'community', name: 'Community', icon: <Users size={16} /> },
    { id: 'points', name: 'Points', icon: <Gift size={16} /> }
  ]

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true
    if (filter === 'unread') return !notification.read
    return notification.type.includes(filter)
  })

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Notifications</h1>
          <p className="text-text-secondary mt-2">
            Stay updated with predictions, matches, and community activity
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={markAllAsRead}
            className="btn-secondary flex items-center space-x-2"
          >
            <CheckCheck size={18} />
            <span>Mark all as read</span>
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="btn-secondary"
          >
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Notification Settings */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="card p-6 overflow-hidden"
          >
            <h3 className="font-bold mb-4">Notification Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['prediction_results', 'match_updates', 'community_activity', 'points_updates', 'marketing'].map((type) => (
                <div key={type} className="flex items-center justify-between p-3 bg-card rounded-xl">
                  <div>
                    <p className="font-medium">{type.split('_').join(' ').toUpperCase()}</p>
                    <p className="text-sm text-text-secondary">Receive {type} notifications</p>
                  </div>
                  <button className="w-12 h-6 bg-primary rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters */}
      <div className="flex items-center space-x-4 overflow-x-auto pb-2">
        {notificationTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setFilter(type.id)}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
              filter === type.id
                ? 'bg-primary text-white'
                : 'bg-card text-text-secondary hover:text-white'
            }`}
          >
            {type.icon && <span>{type.icon}</span>}
            <span className="font-medium">{type.name}</span>
            {type.count !== undefined && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                filter === type.id
                  ? 'bg-white/20'
                  : 'bg-surface'
              }`}>
                {type.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`card p-4 ${!notification.read ? 'border-l-4 border-primary' : ''}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 ${notification.color === 'yellow' ? 'bg-yellow-500/20' :
                                       notification.color === 'green' ? 'bg-green-500/20' :
                                       notification.color === 'blue' ? 'bg-blue-500/20' :
                                       notification.color === 'purple' ? 'bg-purple-500/20' :
                                       notification.color === 'orange' ? 'bg-orange-500/20' :
                                       'bg-gray-500/20'} rounded-xl`}>
                    {notification.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-bold">{notification.title}</h4>
                      {!notification.read && (
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                      )}
                    </div>
                    <p className="text-text-secondary mt-1">{notification.message}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-sm text-text-secondary flex items-center space-x-1">
                        <Clock size={14} />
                        <span>{notification.timestamp}</span>
                      </span>
                      {notification.points && (
                        <span className="text-sm font-bold text-primary">
                          +{notification.points} PTS
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="p-2 hover:bg-hover rounded-lg"
                      title="Mark as read"
                    >
                      <CheckCircle size={18} className="text-text-secondary" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="p-2 hover:bg-hover rounded-lg"
                    title="Delete"
                  >
                    <Trash2 size={18} className="text-text-secondary" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card p-12 text-center"
          >
            <BellOff className="mx-auto text-text-secondary" size={48} />
            <h3 className="text-xl font-bold mt-4">No notifications</h3>
            <p className="text-text-secondary mt-2">
              {filter === 'unread' 
                ? "You're all caught up!"
                : "No notifications match your current filter"}
            </p>
          </motion.div>
        )}
      </div>

      {/* WebSocket Notifications */}
      {wsNotifications.length > 0 && (
        <div className="mt-8">
          <h3 className="font-bold mb-4 flex items-center space-x-2">
            <Zap className="text-green-400" size={20} />
            <span>Live Updates</span>
          </h3>
          <div className="space-y-3">
            {wsNotifications.slice(0, 5).map((notification) => (
              <div
                key={notification.id}
                className="bg-gradient-to-r from-green-900/20 to-green-500/10 border border-green-500/30 rounded-xl p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-medium">LIVE</span>
                  </div>
                  <span className="text-sm text-text-secondary">Now</span>
                </div>
                <p className="mt-2">{notification.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold">{notifications.filter(n => !n.read).length}</div>
          <div className="text-sm text-text-secondary">Unread</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-green-400">
            {notifications.filter(n => n.type === 'prediction_result').length}
          </div>
          <div className="text-sm text-text-secondary">Wins</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold">
            {notifications.reduce((sum, n) => sum + (n.points || 0), 0)}
          </div>
          <div className="text-sm text-text-secondary">Points Earned</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold">30d</div>
          <div className="text-sm text-text-secondary">History</div>
        </div>
      </div>

      {/* Clear All Button */}
      {notifications.length > 0 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={clearAll}
            className="btn-danger flex items-center space-x-2"
          >
            <Trash2 size={18} />
            <span>Clear All Notifications</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default Notifications