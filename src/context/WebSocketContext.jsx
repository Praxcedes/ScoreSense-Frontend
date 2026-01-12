import React, { createContext, useState, useContext, useEffect, useRef } from 'react'
import io from 'socket.io-client'
import { toast } from 'react-hot-toast'

export const WebSocketContext = createContext(null)

export const useWebSocket = () => {
  const context = useContext(WebSocketContext)
  if (!context) {
    console.warn('useWebSocket must be used within WebSocketProvider')
    // Return a mock object to prevent destructuring errors
    return {
      isConnected: false,
      notifications: [],
      subscribe: () => {},
      unsubscribe: () => {},
      send: () => {},
      subscribeToMatch: () => {},
      unsubscribeFromMatch: () => {},
      socket: null
    }
  }
  return context
}

export const WebSocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false)
  const [notifications, setNotifications] = useState([])
  const socketRef = useRef(null)
  const reconnectAttempts = useRef(0)
  const maxReconnectAttempts = 5

  useEffect(() => {
    connectWebSocket()

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
      }
    }
  }, [])

  const connectWebSocket = () => {
    const token = localStorage.getItem('scoresense_token')
    const wsUrl = import.meta.env.DEV
      ? window.location.origin
      : (import.meta.env.VITE_WS_URL || 'wss://api.scoresense.africa')
    
    socketRef.current = io(wsUrl, {
      auth: { token },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: maxReconnectAttempts,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    })

    socketRef.current.on('connect', () => {
      console.log('🔗 WebSocket Connected')
      setIsConnected(true)
      reconnectAttempts.current = 0
      toast.success('Live updates connected')
    })

    socketRef.current.on('disconnect', (reason) => {
      console.log('🔌 WebSocket Disconnected:', reason)
      setIsConnected(false)
      if (reason === 'io server disconnect') {
        setTimeout(() => socketRef.current.connect(), 1000)
      }
    })

    socketRef.current.on('connect_error', (error) => {
      console.error('❌ WebSocket Connection Error:', error.message)
      setIsConnected(false)
      
      if (reconnectAttempts.current < maxReconnectAttempts) {
        reconnectAttempts.current++
        const delay = Math.min(1000 * reconnectAttempts.current, 10000)
        setTimeout(() => socketRef.current.connect(), delay)
      }
    })

    socketRef.current.on('notification', (data) => {
      console.log('📢 New notification:', data)
      setNotifications(prev => [data, ...prev.slice(0, 9)])
    })
  }

  const subscribe = (event, callback) => {
    if (socketRef.current) {
      socketRef.current.on(event, callback)
    }
  }

  const unsubscribe = (event, callback) => {
    if (socketRef.current) {
      socketRef.current.off(event, callback)
    }
  }

  const send = (event, data) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit(event, data)
    }
  }

  const subscribeToMatch = (matchId) => {
    send('subscribe_match', matchId)
  }

  const unsubscribeFromMatch = (matchId) => {
    send('unsubscribe_match', matchId)
  }

  const value = {
    isConnected,
    notifications,
    subscribe,
    unsubscribe,
    send,
    subscribeToMatch,
    unsubscribeFromMatch,
    socket: socketRef.current
  }

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  )
}
