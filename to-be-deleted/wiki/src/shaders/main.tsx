import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Shaders from './Shaders'
import '../index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Shaders />
  </StrictMode>,
)
