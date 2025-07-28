import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext';
import { ReportsProvider } from './context/ReportsContext';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ReportsProvider>
        <App />
      </ReportsProvider>
    </AuthProvider>
  </StrictMode>,
)
