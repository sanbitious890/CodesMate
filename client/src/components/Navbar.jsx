import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200/50 dark:border-gray-700/50 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
              🚀 CodeMates
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/projects" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition font-medium">
              Projects
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition font-medium">
                  Dashboard
                </Link>
                <Link to="/profile" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition font-medium">
                  Profile
                </Link>
                <Link to="/projects/create" className="px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:-translate-y-0.5">
                  + New Project
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-600 transition font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition font-medium">
                  Login
                </Link>
                <Link to="/register" className="px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:-translate-y-0.5">
                  Register
                </Link>
              </>
            )}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all hover:scale-110"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-gray-200 dark:bg-gray-800"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-3">
              <Link to="/projects" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 transition">
                Projects
              </Link>
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 transition">
                    Dashboard
                  </Link>
                  <Link to="/profile" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 transition">
                    Profile
                  </Link>
                  <Link to="/projects/create" className="text-center px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full">
                    + New Project
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 transition">
                    Login
                  </Link>
                  <Link to="/register" className="text-center px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full">
                    Register
                  </Link>
                </>
              )}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 transition w-12"
              >
                {isDark ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar