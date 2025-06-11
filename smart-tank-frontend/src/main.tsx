import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SmartButton from './components/atoms/SmartButtons'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SmartButton text="Click me" onClick={() => console.log("Button clicked")} type="button" variant="contained" />
  </StrictMode>,
)
