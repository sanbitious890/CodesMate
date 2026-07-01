import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { FaHeart, FaProjectDiagram, FaUsers, FaCode, FaTrophy, FaRocket, FaCalendar, FaClock } from 'react-icons/fa'

const Dashboard = () => {
  const { user } = useAuth()
  const [greeting, setGreeting] = useState('')
  const [quote, setQuote] = useState('')

  const quotes = [
    '"Small steps build amazing developers."',
    '"Code is poetry written in logic."',
    '"Every expert was once a beginner."',
    '"The best way to predict the future is to build it."',
  ]

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good Morning')
    else if (hour < 17) setGreeting('Good Afternoon')
    else setGreeting('Good Evening')
    setQuote(quotes[Math.floor(Math.random() * quotes.length)])
  }, [])

  const stats = [
    { icon: FaProjectDiagram, label: 'Projects', value: '12', color: 'from-pink-400 to-pink-500' },
    { icon: FaUsers, label: 'Teammates', value: '8', color: 'from-purple-400 to-purple-500' },
    { icon: FaCode, label: 'Code Snippets', value: '45', color: 'from-blue-400 to-blue-500' },
    { icon: FaTrophy, label: 'Achievements', value: '7', color: 'from-yellow-400 to-yellow-500' },
  ]

  const recentProjects = [
    { title: 'AI Chat App', description: 'Real-time chat with Mochi AI', tech: ['React', 'Firebase'], progress: 75 },
    { title: 'Portfolio Website', description: 'Personal portfolio with animations', tech: ['Next.js', 'Tailwind'], progress: 90 },
    { title: 'E-commerce Platform', description: 'Full-stack e-commerce with payment', tech: ['Node.js', 'MongoDB'], progress: 40 },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl p-8 mb-8 border border-pink-100 shadow-lg">
        <h1 className="text-3xl font-bold text-[#2D1B3D]">
          {greeting}, {user?.displayName || 'Developer'}! 👋
        </h1>
        <p className="text-purple-600 mt-2">Welcome back to Codesmate. Let's build something amazing today!</p>
        <p className="text-pink-500 italic mt-2">✨ {quote}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/40 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/50 shadow-lg"
          >
            <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-3`}>
              <stat.icon className="text-white text-xl" />
            </div>
            <p className="text-2xl font-bold text-[#2D1B3D]">{stat.value}</p>
            <p className="text-sm text-purple-500">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 mb-8">
        <Link to="/projects/create" className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg hover:scale-105 transition flex items-center gap-2">
          <FaRocket /> Create Project
        </Link>
        <Link to="/partner" className="bg-white/50 backdrop-blur-sm border-2 border-pink-300/50 text-purple-700 px-6 py-3 rounded-full font-medium hover:bg-white/70 transition flex items-center gap-2">
          <FaUsers /> Find Partner
        </Link>
        <Link to="/chat" className="bg-white/50 backdrop-blur-sm border-2 border-pink-300/50 text-purple-700 px-6 py-3 rounded-full font-medium hover:bg-white/70 transition flex items-center gap-2">
          <FaHeart /> Chat with Mochi
        </Link>
      </div>

      {/* Recent Projects */}
      <div>
        <h2 className="text-xl font-bold text-[#2D1B3D] mb-4">Recent Projects</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {recentProjects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="bg-white/40 backdrop-blur-lg rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition"
            >
              <h3 className="font-bold text-[#2D1B3D]">{project.title}</h3>
              <p className="text-sm text-purple-500 mt-1">{project.description}</p>
              <div className="flex flex-wrap gap-1 mt-3">
                {project.tech.map((tech, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-pink-50 text-pink-600 text-xs rounded-full border border-pink-200">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-xs text-purple-500 mb-1">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full h-2 bg-pink-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-pink-400 to-purple-400 rounded-full" style={{ width: `${project.progress}%` }} />
                </div>
              </div>
              <Link to={`/projects/${i}`} className="mt-3 block text-center text-pink-500 text-sm font-medium hover:underline">
                View Project →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard