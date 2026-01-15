import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App
      routerConfig={{
        future: {
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }
      }}
    />
  </React.StrictMode>
)
