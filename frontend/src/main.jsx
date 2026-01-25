import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexte/ContexteAuth'
import { ThemeProvider } from './contexte/ContexteTheme'
import { LangueProvider } from './contexte/ContexteLangue'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LangueProvider>
        <AuthProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </AuthProvider>
      </LangueProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
