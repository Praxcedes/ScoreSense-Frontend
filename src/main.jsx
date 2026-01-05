import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.jsx'
import './index.css'
import { WebSocketProvider } from './context/WebSocketContext'
import { PointsProvider } from './context/PointsContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WebSocketProvider>
      <PointsProvider>
        <App />
      </PointsProvider>
    </WebSocketProvider>
  </React.StrictMode>
)