import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  FaHome, FaComments, FaProjectDiagram, FaUsers, 
  FaRegCompass, FaBook, FaRoad, FaTrophy, FaBell,
  FaUser, FaCog, FaMoon, FaSignOutAlt, FaHeart
} from 'react-icons/fa'

const Sidebar = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const links = [
    { to: '/dashboard', icon: FaHome, label: 'Dashboard' },
    { to: '/chat', icon: FaComments, label: 'AI Chat' },
    { to: '/projects', icon: FaProjectDiagram, label: 'Projects' },
    { to: '/partner', icon: FaUsers, label: 'Project Partner' },
    { to: '/community', icon: FaRegCompass, label: 'Community' },
    { to: '/resources', icon: FaBook, label: 'Resources' },
    { to: '/roadmaps', icon: FaRoad, label: 'Roadmaps' },
    { to: '/leaderboard', icon: FaTrophy, label: 'Leaderboard' },
  ]

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white/30 backdrop-blur-xl border-r border-white/40 p-4 flex flex-col z-40">
      <div className="flex items-center gap-2 mb-8 px-2">
        <span className="text-xl font-bold">
          <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Codes</span>
          <span className="text-[#2D1B3D]">mate</span>
          <FaHeart className="inline text-pink-400 ml-1" />
        </span>
      </div>

      <nav className="flex-1 space-y-1">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 shadow-sm'
                  : 'text-purple-600 hover:bg-white/40 hover:text-pink-600'
              }`
            }
          >
            <Icon className="text-lg" />
            <span className="text-sm font-medium">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-pink-200/30 pt-4 space-y-1">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              isActive
                ? 'bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 shadow-sm'
                : 'text-purple-600 hover:bg-white/40 hover:text-pink-600'
            }`
          }
        >
          <FaUser className="text-lg" />
          <span className="text-sm font-medium">Profile</span>
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              isActive
                ? 'bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 shadow-sm'
                : 'text-purple-600 hover:bg-white/40 hover:text-pink-600'
            }`
          }
        >
          <FaCog className="text-lg" />
          <span className="text-sm font-medium">Settings</span>
        </NavLink>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-50 transition-all duration-200"
        >
          <FaSignOutAlt className="text-lg" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar