import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import 'normalize.css'
import { LoginContextProvider } from './context/LoginContext'
import { OptionsContextProvider } from './context/OptionsContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <OptionsContextProvider>
      <LoginContextProvider>
        <App />
      </LoginContextProvider>
    </OptionsContextProvider>
  </React.StrictMode>,
)
