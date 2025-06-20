import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './mainStyle.css'
import 'react-datepicker/dist/react-datepicker.css';
import { App } from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
