import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MainPage from './components/main_page'
import './styles/main.css'
import './styles/dashboard.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainPage />
  </StrictMode>,
)
