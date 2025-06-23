import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../App'

const Navbar = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext)
  return (
    <nav className={
      darkMode
        ? "navbar dark-navbar sharp-navbar"
        : "navbar light-navbar sharp-navbar"
    }>
      <div className="logo flex items-center gap-2">
        <span className={darkMode ? 'font-extrabold text-2xl tracking-wider text-fuchsia400 drop-shadow' : 'font-extrabold text-2xl tracking-wider text-violet700 drop-shadow'}>🌠 InspireList</span>
      </div>
      <div className="nav-actions flex items-center gap-4">
        <Link to="/" className={darkMode ? 'nav-link dark' : 'nav-link light'}>Home</Link>
        <Link to="/app" className={darkMode ? 'nav-link dark' : 'nav-link light'}>Your Inspirations</Link>
        <button
          onClick={() => setDarkMode((d) => !d)}
          className={darkMode
            ? 'toggle-btn dark'
            : 'toggle-btn light'}
          aria-label="Toggle dark mode"
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
