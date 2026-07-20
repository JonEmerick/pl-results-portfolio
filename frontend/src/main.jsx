import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx' 
import ConfigFactory from './ConfigFactory.js'

const factory = new ConfigFactory()
const connector = factory.getConnector()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App connector={connector} />
  </StrictMode>,
)
