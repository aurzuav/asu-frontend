import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import Login from './profile/Login'
import Routing from './common/Routing'
import AuthProvider from './auth/AuthProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <Routing />
    </AuthProvider>
  </React.StrictMode>,
)
