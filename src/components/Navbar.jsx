import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../App'

const Navbar = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext)
  return (
    <nav className={
      darkMode
        ? "flex justify-between items-center bg-[#181f3a] bg-opacity-90 shadow-lg text-blue-100 py-3 px-6 border-b-2 border-blue-900 relative z-10"
        : "flex justify-between items-center bg-white bg-opacity-90 shadow-lg text-violet-900 py-3 px-6 border-b-2 border-violet-200 relative z-10"
    }>
      <div className="logo flex items-center gap-2">
        <span className={darkMode ? 'font-extrabold text-2xl tracking-wider text-fuchsia-400 drop-shadow' : 'font-extrabold text-2xl tracking-wider text-violet-700 drop-shadow'}>🌠 InspireList</span>
      </div>
      <ul className="flex gap-8 items-center">
        <li>
          <Link to="/" className={darkMode ? 'cursor-pointer font-semibold text-blue-100 hover:text-fuchsia-400 transition-all duration-200 px-3 py-1 rounded-full hover:bg-[#232b4a]' : 'cursor-pointer font-semibold text-violet-900 hover:text-fuchsia-500 transition-all duration-200 px-3 py-1 rounded-full hover:bg-violet-100'}>Home</Link>
        </li>
        <li>
          <Link to="/app" className={darkMode ? 'cursor-pointer font-semibold text-blue-100 hover:text-fuchsia-400 transition-all duration-200 px-3 py-1 rounded-full hover:bg-[#232b4a]' : 'cursor-pointer font-semibold text-violet-900 hover:text-fuchsia-500 transition-all duration-200 px-3 py-1 rounded-full hover:bg-violet-100'}>Your Inspirations</Link>
        </li>
        <li>
          <button
            onClick={() => setDarkMode((d) => !d)}
            className={darkMode
              ? 'ml-4 px-4 py-1 rounded-full bg-[#232b4a] text-fuchsia-400 font-bold shadow hover:bg-fuchsia-400 hover:text-blue-900 transition-all duration-200'
              : 'ml-4 px-4 py-1 rounded-full bg-violet-100 text-violet-700 font-bold shadow hover:bg-fuchsia-100 hover:text-fuchsia-600 transition-all duration-200'}
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
