import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import { toast } from 'react-hot-toast'

export const WebSocketContext = createContext(null)

export const useWebSocket = () => {
  const ctx = useContext(WebSocketContext)
  if (!ctx) {
    return {
      isConnected: false,
      socket: null,
      subscribe: () => {},
      unsubscribe: () => {},
      send: () => {}
    }
  }
  return ctx
}

export const WebSocketProvider = ({ children }) => {
  const socketRef = useRef(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('accessToken')

    const baseUrl =
      import.meta.env.VITE_SOCKET_URL ||
      import.meta.env.VITE_WS_URL ||
      (import.meta.env.VITE_API_URL
        ? import.meta.env.VITE_API_URL.replace('/api', '')
        : 'https://scoresense-africa-backend.onrender.com')

    socketRef.current = io(baseUrl, {
      path: '/socket.io',
      transports: ['websocket'],
      auth: {
        token: token ? `Bearer ${token}` : undefined
      }
    })

    socketRef.current.on('connect', () => {
      setIsConnected(true)
      console.log('[WS] connected')
    })

    socketRef.current.on('disconnect', () => {
      setIsConnected(false)
      console.log('[WS] disconnected')
    })

    socketRef.current.on('connect_error', (err) => {
      console.error('[WS] connection error:', err.message)
    })

    return () => {
      socketRef.current?.disconnect()
    }
  }, [])

  const subscribe = (event, cb) => {
    socketRef.current?.on(event, cb)
  }

  const unsubscribe = (event, cb) => {
    socketRef.current?.off(event, cb)
  }

  const send = (event, payload) => {
    if (isConnected) {
      socketRef.current?.emit(event, payload)
    }
  }

  return (
    <WebSocketContext.Provider
      value={{
        socket: socketRef.current,
        isConnected,
        subscribe,
        unsubscribe,
        send
      }}
    >
      {children}
    </WebSocketContext.Provider>
  )
}
