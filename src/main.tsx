import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App01.tsx' // zustand的基本使用和异步（步骤较为繁琐）
// import App from './App02.tsx' // immer的使用简化zustand的步骤
import App from './App03.tsx' // immer的使用简化zustand的步骤使用store的简化操作

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
