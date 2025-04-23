
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { worker } from './mocks/browser'

// Initialize MSW worker before rendering the app
async function startApp() {
  if (process.env.NODE_ENV !== 'production') {
    await worker.start({
      onUnhandledRequest: 'bypass', // Don't warn about unhandled requests
    })
  }
  
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}

startApp()
