import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './mobile-fix.css'
import App from './App.jsx'
import MobileHome from './MobileHome.jsx'

const isMobileHome = window.matchMedia('(max-width: 767px)').matches && window.location.pathname === '/'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isMobileHome ? <MobileHome /> : <App />}
  </StrictMode>,
)
