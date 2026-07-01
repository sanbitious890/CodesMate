import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaHeart, FaRocket, FaUsers, FaCode, FaStar, FaArrowRight } from 'react-icons/fa'

const LandingPage = () => {
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts(prev => [...prev, {
        id: Date.now(),
        x: Math.random() * 100,
        size: Math.random() * 20 + 10,
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 2,
      }])
      setTimeout(() => setHearts(prev => prev.slice(1)), 5000)
    }, 300)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F7] via-[#FFE8EE] to-[#F8F0FF] relative overflow-hidden">
      {/* Floating Hearts */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: '100%', x: `${heart.x}%`, opacity: 0, scale: 0 }}
          animate={{ y: '-10%', opacity: 0.4, scale: 1 }}
          transition={{ duration: heart.duration, delay: heart.delay, ease: 'easeOut' }}
          className="absolute text-pink-300/40"
          style={{ fontSize: heart.size, left: `${heart.x}%` }}
        >
          <FaHeart />
        </motion.div>
      ))}

      {/* 3D Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-pink-300/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-300/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Nav */}
        <nav className="flex justify-between items-center mb-20">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Codes</span>
              <span className="text-[#2D1B3D]">mate</span>
              <FaHeart className="inline text-pink-400 ml-1" />
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-purple-600 hover:text-pink-600 transition font-medium">Sign In</Link>
            <Link to="/signup" className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-6 py-2.5 rounded-full font-medium hover:shadow-lg hover:scale-105 transition">Create Account</Link>
          </div>
        </nav>

        {/* Hero */}
        <div className="text-center max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-6xl md:text-7xl font-bold text-[#2D1B3D] mb-6">
              Build Amazing Things
              <br />
              <span className="bg-gradient-to-r from-pink-400 via-pink-500 to-purple-400 bg-clip-text text-transparent">
                Together
              </span>
            </h1>
            <p className="text-xl text-purple-600 max-w-2xl mx-auto mb-8">
              Connect with developers, collaborate on projects, and build amazing things with your AI coding buddy Mochi.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link to="/signup" className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition flex items-center gap-2">
              Get Started <FaArrowRight />
            </Link>
            <Link to="/login" className="bg-white/50 backdrop-blur-sm border-2 border-pink-300/50 text-purple-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/70 transition">
              Sign In
            </Link>
          </motion.div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-4 gap-6 mt-20">
          {[
            { icon: FaCode, title: 'AI Coding', desc: 'Mochi AI helps you code, debug, and learn' },
            { icon: FaUsers, title: 'Find Teammates', desc: 'AI matches you with perfect coding partners' },
            { icon: FaRocket, title: 'Build Projects', desc: 'Create amazing projects with your team' },
            { icon: FaStar, title: 'Learn & Grow', desc: 'Roadmaps, resources, and community support' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="bg-white/30 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/50 shadow-lg hover:shadow-xl transition"
            >
              <feature.icon className="text-4xl text-pink-400 mx-auto mb-3" />
              <h3 className="font-bold text-[#2D1B3D]">{feature.title}</h3>
              <p className="text-sm text-purple-500">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-20 text-center text-sm text-purple-400 border-t border-pink-200/30 pt-8">
          <p>© 2026 Codesmate. Made with <FaHeart className="inline text-pink-400" /> by developers, for developers.</p>
        </footer>
      </div>
    </div>
  )
}

export default LandingPage