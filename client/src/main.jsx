import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import 'normalize.css'
import { LoginContextProvider } from './context/LoginContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoginContextProvider>
      <App />
    </LoginContextProvider>
  </React.StrictMode>,
)
