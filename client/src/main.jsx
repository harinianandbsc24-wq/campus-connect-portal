import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


// Mounts React specifically to your auth-root div in index.html
createRoot(document.getElementById('auth-root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)