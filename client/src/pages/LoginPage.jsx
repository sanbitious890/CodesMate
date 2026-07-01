import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { FaHeart, FaSignInAlt, FaUserPlus } from 'react-icons/fa'
import MochiAI from '../components/MochiAI'

const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showPetChat, setShowPetChat] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [quote, setQuote] = useState('')
  const [petMessage, setPetMessage] = useState('')
  const [chatHistory, setChatHistory] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [isHoveringButton, setIsHoveringButton] = useState(false)
  const [isInputFocused, setIsInputFocused] = useState(false)
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

  const handlePetChat = () => {
    if (petMessage.trim()) {
      setIsTyping(true)
      const responses = [
        "That's a great question! Let me think... 🤔\n\n💡 Here's what I'd recommend...",
        "I love this idea! Let me explain... ✨\n\n📚 The key thing to understand is...",
        "Great question! Let me break it down:\n\n🔍 First, let's look at...",
        "This is such a cool concept! 💗\n\n🚀 Here's how we can approach it...",
      ]
      const response = responses[Math.floor(Math.random() * responses.length)]
      
      setTimeout(() => {
        setChatHistory([
          ...chatHistory,
          { user: petMessage, pet: response + "\n\n💗 Let me know if you need more help!" }
        ])
        setPetMessage('')
        setIsTyping(false)
      }, 1500)
    }
  }

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
        onChatOpen={() => setShowPetChat(!showPetChat)}
        showChat={showPetChat}
        isTyping={isTyping}
        isHoveringButton={isHoveringButton}
        isInputFocused={isInputFocused}
        onLoginSuccess={loginSuccess}
      />

      {/* Pet Chat */}
      <AnimatePresence>
        {showPetChat && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            className="fixed bottom-32 right-8 w-80 max-h-[500px] bg-white/95 backdrop-blur-2xl rounded-3xl p-5 shadow-2xl border-2 border-pink-200/50 z-30 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-3 pb-3 border-b border-pink-100/50">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center shadow-md">
                <span className="text-xl">☁️</span>
              </div>
              <div>
                <div className="font-semibold text-purple-700 flex items-center gap-1.5">
                  Mochi AI
                  <span className="text-[10px] text-purple-400 font-normal">✨ 4.9</span>
                </div>
                <div className="text-xs text-purple-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block animate-pulse" />
                  Online • Coding Buddy
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto max-h-52 space-y-2 mb-3 pr-1">
              {chatHistory.map((chat, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="text-sm text-purple-700 bg-pink-50 p-3 rounded-2xl rounded-bl-none border border-pink-100/50">
                    💬 {chat.user}
                  </div>
                  <div className="text-sm text-purple-700 bg-purple-50 p-3 rounded-2xl rounded-br-none border border-purple-100/50 whitespace-pre-wrap">
                    🤖 {chat.pet}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="text-sm text-purple-400 bg-purple-50 p-3 rounded-2xl rounded-br-none border border-purple-100/50">
                  🤖 <span className="inline-flex gap-1">
                    <span className="animate-bounce">•</span>
                    <span className="animate-bounce delay-100">•</span>
                    <span className="animate-bounce delay-200">•</span>
                  </span>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={petMessage}
                onChange={(e) => setPetMessage(e.target.value)}
                placeholder="💭 Ask Mochi anything..."
                className="flex-1 px-4 py-2.5 rounded-full border-2 border-pink-200/50 focus:border-pink-400 outline-none transition bg-white/50 text-purple-700 text-sm placeholder-purple-300"
                onKeyPress={(e) => e.key === 'Enter' && handlePetChat()}
              />
              <button
                onClick={handlePetChat}
                className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-4 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg transition flex-shrink-0"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-purple-300/50">
        © 2026 Codesmate
      </div>

    </div>
  )
}

export default LoginPage