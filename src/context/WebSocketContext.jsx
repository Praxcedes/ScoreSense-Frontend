import React, { createContext, useState, useContext, useEffect } from 'react'

export const WebSocketContext = createContext({})

export const useWebSocket = () => useContext(WebSocketContext)

export const WebSocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(true) // Mock connected
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Welcome!', message: 'Welcome to ScoreSense Africa Demo', time: 'Just now' },
    { id: 2, title: 'Live Match', message: 'Gor Mahia vs AFC Leopards is live', time: '5 min ago' },
    { id: 3, title: 'Prediction Won', message: 'You won 120 points!', time: '1 hour ago' }
  ])

  // Simulate occasional notifications
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance
        const newNotification = {
          id: notifications.length + 1,
          title: ['Live Update', 'Goal!', 'Match Starting'][Math.floor(Math.random() * 3)],
          message: 'Demo notification from mock WebSocket',
          time: 'Just now'
        }
        setNotifications(prev => [newNotification, ...prev.slice(0, 9)])
      }
    }, 30000) // Every 30 seconds

    return () => clearInterval(interval)
  }, [notifications.length])

  const value = {
    isConnected,
    notifications,
    subscribe: () => {}, // No-op for mock
    unsubscribe: () => {}, // No-op for mock
    send: () => {}, // No-op for mock
    subscribeToMatch: () => {}, // No-op for mock
    unsubscribeFromMatch: () => {} // No-op for mock
  }

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  )
}