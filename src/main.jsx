import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


import './index.css'
import App, { ThemeContext } from './App.jsx'
import Home from './components/Home.jsx'

function MainRouter() {
  const [darkMode, setDarkMode] = useState(false)
  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app" element={<App />} />
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainRouter />
  </StrictMode>,
)
