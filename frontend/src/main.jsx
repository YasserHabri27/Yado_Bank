import React from 
import ReactDOM from 
import App from 
import 
import { BrowserRouter } from 
import { AuthProvider } from 
import { ThemeProvider } from 
import { LangueProvider } from 

ReactDOM.createRoot(document.getElementById()).render(
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
