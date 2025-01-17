import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App01.tsx' // zustand的基本使用和异步（步骤较为繁琐）
// import App from './App02.tsx' // immer的使用简化zustand的步骤
// import App from './App03.tsx' // immer的使用简化zustand的步骤使用store的简化操作
// import App from './App04.tsx' // devtools的使用
// import App from './App05.tsx' // 持久化保存
import App from './App06.tsx' // 发布订阅

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
