import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { FaHeart, FaSignInAlt, FaUserPlus } from 'react-icons/fa'
import MochiAI from '../components/MochiAI'
import AIChat from '../components/AIChat'

const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [quote, setQuote] = useState('')
  const [isHoveringButton, setIsHoveringButton] = useState(false)
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)

  const quotes = [
    '"Small steps build amazing developers."',
    '"Code is poetry written in logic."',
    '"Every expert was once a beginner."',
    '"The best way to predict the future is to build it."',
    '"Learning to code is learning to create."',
  ]

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setQuote(quotes[Math.floor(Math.random() * quotes.length)])
    }, 15000)
    return () => clearInterval(quoteInterval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const result = await login(email, password)
    setLoading(false)
    if (result.success) {
      setLoginSuccess(true)
      setTimeout(() => {
        navigate('/dashboard')
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F7] via-[#FFE8EE] to-[#F8F0FF] relative overflow-hidden flex items-center justify-center p-4">
      
      {/* 3D Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200/20 via-purple-200/20 to-pink-300/20 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-300/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-300/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -30, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6 + i * 1.5, repeat: Infinity, delay: i * 1.2 }}
            className="absolute"
            style={{ top: `${5 + i * 15}%`, left: `${3 + i * 14}%` }}
          >
            <FaHeart className={`text-pink-300/20 text-${4 + i % 3}xl`} />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-md w-full"
      >
        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold flex items-center justify-center gap-2 font-['Dancing_Script','cursive']">
            <span className="bg-gradient-to-r from-pink-400 via-pink-500 to-purple-400 bg-clip-text text-transparent">
              Codes
            </span>
            <span className="text-[#2D1B3D]">mate</span>
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-pink-400"
            >
              <FaHeart className="text-3xl" />
            </motion.span>
          </h1>
          <p className="text-purple-600 text-sm mt-2 font-['Dancing_Script','cursive']">
            ✨ Find your coding companion ✨
          </p>
        </div>

        {/* Quote */}
        <div className="text-center mb-8 min-h-[4rem]">
          <AnimatePresence mode="wait">
            <motion.p
              key={quote}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1 }}
              className="text-purple-600 text-lg italic font-['Dancing_Script','cursive'] max-w-sm mx-auto"
            >
              {quote || '"Small steps build amazing developers."'}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Login Form */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/30 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/40"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-purple-700 text-sm font-medium mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                className="w-full px-4 py-3.5 rounded-2xl border-2 border-pink-200/50 focus:border-pink-400 outline-none transition bg-white/40 text-purple-800 placeholder-purple-300"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-purple-700 text-sm font-medium mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  className="w-full px-4 py-3.5 rounded-2xl border-2 border-pink-200/50 focus:border-pink-400 outline-none transition bg-white/40 text-purple-800 placeholder-purple-300"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400/60 hover:text-purple-600 transition"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-400 via-pink-500 to-purple-400 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg relative overflow-hidden group transition-all duration-300 disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={() => setIsHoveringButton(true)}
              onMouseLeave={() => setIsHoveringButton(false)}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? 'Signing in...' : (
                  <>
                    Sign In
                    <FaSignInAlt className="group-hover:rotate-12 transition" />
                  </>
                )}
              </span>
            </motion.button>
          </form>

          <div className="mt-4 text-center">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/50 backdrop-blur-sm border-2 border-pink-300/50 text-purple-700 rounded-2xl font-semibold hover:bg-white/70 transition hover:scale-105 hover:shadow-lg group"
              onMouseEnter={() => setIsHoveringButton(true)}
              onMouseLeave={() => setIsHoveringButton(false)}
            >
              <FaUserPlus className="text-pink-400 group-hover:rotate-12 transition" />
              Create Account
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Mochi AI */}
      <MochiAI
        mousePosition={mousePosition}
        onChatOpen={() => setShowChat(!showChat)}
        isTyping={isTyping}
        isHoveringButton={isHoveringButton}
        isInputFocused={isInputFocused}
        onLoginSuccess={loginSuccess}
      />

      {/* AI Chat */}
      <AIChat
        isOpen={showChat}
        onClose={() => setShowChat(false)}
        petName="Mochi"
      />

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-purple-300/50">
        © 2026 Codesmate
      </div>

    </div>
  )
}

export default LoginPage/ /   F o r c e   r e b u i l d   a t   0 7 / 0 1 / 2 0 2 6   1 2 : 4 2 : 5 7  
 