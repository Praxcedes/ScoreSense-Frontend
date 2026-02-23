import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bell,
  BellOff,
  CheckCircle,
  Trophy,
  Users,
  Gift,
  Clock,
  Trash2,
  Settings,
  CheckCheck,
  Star,
  Shield,
  Zap
} from 'lucide-react'
import { useWebSocket } from '../../hooks/useWebSocket'
import { notificationsService } from '../../services/notifications.service'
import { toast } from 'react-hot-toast'

const safeArray = (v) => (Array.isArray(v) ? v : [])

const Notifications = () => {
  const ws = useWebSocket()
  const wsNotifications = safeArray(ws?.notifications)

  const [notifications, setNotifications] = useState([])
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [settingsSaving, setSettingsSaving] = useState(false)

  const [filter, setFilter] = useState('all')
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true)
        const response = await notificationsService.getNotifications({ page: 1, per_page: 20 })
        setNotifications(safeArray(response?.notifications))
      } catch (error) {
        toast.error(error?.error || 'Failed to load notifications')
      } finally {
        setLoading(false)
      }
    }

    const fetchSettings = async () => {
      try {
        const response = await notificationsService.getSettings()
        setSettings(response?.settings || null)
      } catch (error) {
        console.warn('Failed to load notification settings:', error)
      }
    }

    fetchNotifications()
    fetchSettings()
  }, [])

  const mappedNotifications = useMemo(() => {
    return safeArray(notifications).map((notification) => {
      const type = notification?.type || 'system'
      const createdAt = notification?.created_at
        ? new Date(notification.created_at).toLocaleString()
        : 'Just now'

      if (type === 'prediction_result') {
        return { ...notification, icon: <Trophy className="text-yellow-400" />, color: 'yellow', timestamp: createdAt }
      }
      if (type === 'match_start') {
        return { ...notification, icon: <Zap className="text-green-400" />, color: 'green', timestamp: createdAt }
      }
      if (type === 'community') {
        return { ...notification, icon: <Users className="text-blue-400" />, color: 'blue', timestamp: createdAt }
      }
      if (type === 'points') {
        return { ...notification, icon: <Gift className="text-purple-400" />, color: 'purple', timestamp: createdAt }
      }
      if (type === 'achievement') {
        return { ...notification, icon: <Star className="text-orange-400" />, color: 'orange', timestamp: createdAt }
      }
      return { ...notification, icon: <Shield className="text-gray-400" />, color: 'gray', timestamp: createdAt }
    })
  }, [notifications])

  const mergedLiveNotifications = useMemo(() => {
    const liveItems = wsNotifications.map((notification) => ({
      ...notification,
      id: notification?.id || `live-${notification?.message || Math.random().toString(16).slice(2)}`,
      type: notification?.type || 'system',
      title: notification?.title || 'Live Update',
      read: false,
      created_at: notification?.created_at || new Date().toISOString(),
      points: notification?.points || 0,
      message: notification?.message || ''
    }))

    return [...liveItems, ...mappedNotifications]
  }, [wsNotifications, mappedNotifications])

  const notificationTypes = useMemo(() => ([
    { id: 'all', name: 'All', count: mergedLiveNotifications.length },
    { id: 'unread', name: 'Unread', count: mergedLiveNotifications.filter(n => !n.read).length },
    { id: 'prediction', name: 'Predictions', icon: <Trophy size={16} /> },
    { id: 'match', name: 'Matches', icon: <Zap size={16} /> },
    { id: 'community', name: 'Community', icon: <Users size={16} /> },
    { id: 'points', name: 'Points', icon: <Gift size={16} /> }
  ]), [mergedLiveNotifications])

  const filteredNotifications = useMemo(() => {
    return mergedLiveNotifications.filter((notification) => {
      if (filter === 'all') return true
      if (filter === 'unread') return !notification.read
      return (notification.type || '').includes(filter)
    })
  }, [mergedLiveNotifications, filter])

  const markAsRead = async (id) => {
    try {
      await notificationsService.markRead(id)
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
    } catch (error) {
      toast.error(error?.error || 'Failed to mark as read')
    }
  }

  const markAllAsRead = async () => {
    try {
      await notificationsService.markAllRead()
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    } catch (error) {
      toast.error(error?.error || 'Failed to mark all as read')
    }
  }

  const deleteNotification = async (id) => {
    try {
      await notificationsService.deleteNotification(id)
      setNotifications((prev) => prev.filter((n) => n.id !== id))
    } catch (error) {
      toast.error(error?.error || 'Failed to delete notification')
    }
  }

  const clearAll = async () => {
    try {
      await notificationsService.clearAll()
      setNotifications([])
    } catch (error) {
      toast.error(error?.error || 'Failed to clear notifications')
    }
  }

  const toggleSetting = async (key) => {
    if (!settings) return
    const updated = { ...settings, [key]: !settings[key] }

    try {
      setSettingsSaving(true)
      const response = await notificationsService.updateSettings(updated)
      setSettings(response?.settings || updated)
      toast.success('Settings updated')
    } catch (error) {
      toast.error(error?.error || 'Failed to update settings')
    } finally {
      setSettingsSaving(false)
    }
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
          <button onClick={markAllAsRead} className="btn-secondary flex items-center space-x-2">
            <CheckCheck size={18} />
            <span>Mark all as read</span>
          </button>
          <button onClick={() => setShowSettings(!showSettings)} className="btn-secondary">
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
            {!settings ? (
              <div className="text-sm text-text-secondary">Settings unavailable.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['prediction_results', 'match_updates', 'community_activity', 'points_updates', 'marketing', 'email_enabled'].map((type) => (
                  <div key={type} className="flex items-center justify-between p-3 bg-card rounded-xl">
                    <div>
                      <p className="font-medium">{type.split('_').join(' ').toUpperCase()}</p>
                      <p className="text-sm text-text-secondary">Receive {type} notifications</p>
                    </div>
                    <button
                      onClick={() => toggleSetting(type)}
                      disabled={settingsSaving}
                      className={`w-12 h-6 rounded-full relative transition ${settings[type] ? 'bg-primary' : 'bg-surface'}`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition ${settings[type] ? 'left-6' : 'left-0.5'}`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            )}
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
              filter === type.id ? 'bg-primary text-white' : 'bg-card text-text-secondary hover:text-white'
            }`}
          >
            {type.icon && <span>{type.icon}</span>}
            <span className="font-medium">{type.name}</span>
            {type.count !== undefined && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${filter === type.id ? 'bg-white/20' : 'bg-surface'}`}>
                {type.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card p-8 text-center"
          >
            <Bell className="mx-auto text-text-secondary" size={32} />
            <p className="text-text-secondary mt-3">Loading notifications...</p>
          </motion.div>
        )}

        {safeArray(filteredNotifications).length > 0 ? (
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
                  <div
                    className={`p-2 ${
                      notification.color === 'yellow' ? 'bg-yellow-500/20' :
                      notification.color === 'green' ? 'bg-green-500/20' :
                      notification.color === 'blue' ? 'bg-blue-500/20' :
                      notification.color === 'purple' ? 'bg-purple-500/20' :
                      notification.color === 'orange' ? 'bg-orange-500/20' :
                      'bg-gray-500/20'
                    } rounded-xl`}
                  >
                    {notification.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-bold">{notification.title}</h4>
                      {!notification.read && <span className="w-2 h-2 bg-primary rounded-full" />}
                    </div>

                    <p className="text-text-secondary mt-1">{notification.message}</p>

                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-sm text-text-secondary flex items-center space-x-1">
                        <Clock size={14} />
                        <span>{notification.timestamp}</span>
                      </span>
                      {notification.points ? (
                        <span className="text-sm font-bold text-primary">+{notification.points} PTS</span>
                      ) : null}
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
              {filter === 'unread' ? "You're all caught up!" : 'No notifications match your current filter'}
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
                key={notification.id || `live-card-${notification.message || Math.random().toString(16).slice(2)}`}
                className="bg-gradient-to-r from-green-900/20 to-green-500/10 border border-green-500/30 rounded-xl p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="font-medium">LIVE</span>
                  </div>
                  <span className="text-sm text-text-secondary">Now</span>
                </div>
                <p className="mt-2">{notification.message || ''}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold">{mergedLiveNotifications.filter(n => !n.read).length}</div>
          <div className="text-sm text-text-secondary">Unread</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-green-400">
            {mergedLiveNotifications.filter(n => n.type === 'prediction_result').length}
          </div>
          <div className="text-sm text-text-secondary">Wins</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold">
            {mergedLiveNotifications.reduce((sum, n) => sum + (n.points || 0), 0)}
          </div>
          <div className="text-sm text-text-secondary">Points Earned</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold">30d</div>
          <div className="text-sm text-text-secondary">History</div>
        </div>
      </div>

      {/* Clear All Button */}
      {safeArray(notifications).length > 0 && (
        <div className="flex justify-center mt-8">
          <button onClick={clearAll} className="btn-danger flex items-center space-x-2">
            <Trash2 size={18} />
            <span>Clear All Notifications</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default Notifications
