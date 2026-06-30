import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Settings = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Settings
      </h1>

      <div className="glass-card p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Appearance
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-700 dark:text-gray-300">
              {isDark ? 'Dark Mode' : 'Light Mode'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Toggle between dark and light theme
            </p>
          </div>
          <button
            onClick={() => setIsDark(!isDark)}
            className="text-4xl p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Account
        </h2>
        <button
          onClick={handleLogout}
          className="w-full px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Settings