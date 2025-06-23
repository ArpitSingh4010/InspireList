import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../App'

const Navbar = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext)
  return (
    <nav className={
      darkMode
        ? "flex justify-between items-center dark-navbar"
        : "flex justify-between items-center light-navbar"
    }>
      <div className="logo flex items-center gap-2">
        <span className={darkMode ? 'font-extrabold text-2xl tracking-wider text-fuchsia400 drop-shadow' : 'font-extrabold text-2xl tracking-wider text-violet700 drop-shadow'}>🌠 InspireList</span>
      </div>
      <ul className="flex gap-8 items-center">
        <li>
          <Link to="/" className={darkMode ? 'cursor-pointer font-semibold text-blue100 hover-text-fuchsia400 px-3 py-1 rounded-full hover-bg-dark2' : 'cursor-pointer font-semibold text-violet900 hover-text-fuchsia500 px-3 py-1 rounded-full hover-bg-violet100'}>Home</Link>
        </li>
        <li>
          <Link to="/app" className={darkMode ? 'cursor-pointer font-semibold text-blue100 hover-text-fuchsia400 px-3 py-1 rounded-full hover-bg-dark2' : 'cursor-pointer font-semibold text-violet900 hover-text-fuchsia500 px-3 py-1 rounded-full hover-bg-violet100'}>Your Inspirations</Link>
        </li>
        <li>
          <button
            onClick={() => setDarkMode((d) => !d)}
            className={darkMode
              ? 'ml-4 px-4 py-1 rounded-full bg-dark2 text-fuchsia400 font-bold shadow hover-bg-fuchsia400 hover-text-blue900'
              : 'ml-4 px-4 py-1 rounded-full bg-violet100 text-violet700 font-bold shadow hover-bg-fuchsia100 hover-text-fuchsia600'}
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
