import React, { useState } from 'react'
import { FaCog, FaHeart, FaMoon, FaSun, FaBell, FaLock } from 'react-icons/fa'

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-[#2D1B3D] flex items-center gap-2 mb-6">
        Settings <FaHeart className="text-pink-400" />
      </h1>

      <div className="space-y-4">
        <div className="bg-white/40 backdrop-blur-lg rounded-2xl p-6 border border-white/50 shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaMoon className="text-purple-400 text-xl" />
            <div>
              <p className="font-medium text-[#2D1B3D]">Dark Mode</p>
              <p className="text-sm text-purple-500">Toggle dark/light theme</p>
            </div>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-12 h-6 bg-pink-200 rounded-full relative transition"
          >
            <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition ${darkMode ? 'right-0.5 bg-pink-400' : 'left-0.5'}`} />
          </button>
        </div>

        <div className="bg-white/40 backdrop-blur-lg rounded-2xl p-6 border border-white/50 shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaBell className="text-purple-400 text-xl" />
            <div>
              <p className="font-medium text-[#2D1B3D]">Notifications</p>
              <p className="text-sm text-purple-500">Manage your notifications</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full text-sm">Enable</button>
        </div>

        <div className="bg-white/40 backdrop-blur-lg rounded-2xl p-6 border border-white/50 shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaLock className="text-purple-400 text-xl" />
            <div>
              <p className="font-medium text-[#2D1B3D]">Privacy</p>
              <p className="text-sm text-purple-500">Manage your privacy settings</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full text-sm">Manage</button>
        </div>
      </div>
    </div>
  )
}

export default Settings