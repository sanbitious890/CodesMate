import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { 
  FaHeart, FaSignInAlt, FaUserPlus, FaSparkles, 
  FaCode, FaRocket, FaStar, FaComments, FaPaw,
  FaTwitter, FaGithub, FaGoogle
} from 'react-icons/fa'

const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [petPosition, setPetPosition] = useState({ x: 0, y: 0 })
  const [petState, setPetState] = useState('idle')
  const [showPetChat, setShowPetChat] = useState(false)
  const [petMessage, setPetMessage] = useState('')
  const [chatHistory, setChatHistory] = useState([])
  const [quote, setQuote] = useState('')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isTyping, setIsTyping] = useState(false)
  const [isPetSleeping, setIsPetSleeping] = useState(false)
  const petRef = useRef(null)

  const quotes = [
    '"Small steps build amazing developers."',
    '"Code is poetry written in logic."',
    '"Every expert was once a beginner."',
    '"The best way to predict the future is to build it."',
    '"Learning to code is learning to create."',
  ]

  const petResponses = {
    greet: ["Hello! I'm Pixel! 🐱", "Nice to meet you! 💗", "Ready to code? ✨"],
    code: ["Great code starts with great thinking 💡", "Debugging is like solving a puzzle 🧩", "Keep it simple, keep it clean 🌸"],
    encouragement: ["You're doing amazing! 💫", "I believe in you! 🌷", "Every expert was once a beginner 🎀"],
    random: ["Let's build something incredible! 🚀", "Coffee first, code later ☕", "You've got this! 💪"]
  }

  const codingTips = [
    '💻 Try using useState for state management',
    '🚀 Remember to use useEffect for side effects',
    '💡 Keep your components small and focused',
    '🌈 Always use meaningful variable names',
    '✨ Practice makes perfect!',
  ]

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setQuote(quotes[Math.floor(Math.random() * quotes.length)])
    }, 5000)
    return () => clearInterval(quoteInterval)
  }, [])

  useEffect(() => {
    const moveInterval = setInterval(() => {
      const newX = (Math.random() - 0.5) * 80
      const newY = (Math.random() - 0.5) * 60
      setPetPosition({ x: newX, y: newY })
      
      const states = ['idle', 'jump', 'wave', 'spin', 'stretch']
      const newState = states[Math.floor(Math.random() * states.length)]
      setPetState(newState)
      
      if (Math.random() < 0.1) {
        setIsPetSleeping(true)
        setPetState('sleep')
        setTimeout(() => {
          setIsPetSleeping(false)
          setPetState('wake')
        }, 3000)
      }
      
      setTimeout(() => {
        if (!isPetSleeping) setPetState('idle')
      }, 1200)
    }, 4000)
    return () => clearInterval(moveInterval)
  }, [isPetSleeping])

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
        ...petResponses.greet,
        ...petResponses.code,
        ...petResponses.encouragement,
        ...petResponses.random
      ]
      const response = responses[Math.floor(Math.random() * responses.length)]
      const tip = codingTips[Math.floor(Math.random() * codingTips.length)]
      
      setTimeout(() => {
        setChatHistory([
          ...chatHistory,
          { user: petMessage, pet: `${response}\n\n💡 ${tip}` }
        ])
        setPetMessage('')
        setIsTyping(false)
        setPetState('excited')
        setTimeout(() => setPetState('idle'), 1500)
      }, 1000)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setPetState('celebrate')
    
    const result = await login(email, password)
    setLoading(false)
    if (result.success) {
      setTimeout(() => {
        setPetState('excited')
        navigate('/dashboard')
      }, 1500)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F7] via-[#FFE8EE] to-[#F8F0FF] relative overflow-hidden flex items-center justify-center p-4">
      
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 6 + i * 1.5, repeat: Infinity, delay: i * 1.2 }}
            className="absolute opacity-30"
            style={{
              top: `${5 + i * 15}%`,
              left: `${3 + i * 14}%`,
            }}
          >
            <FaHeart className={`text-pink-300/30 text-${4 + i % 3}xl`} />
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
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-5xl font-bold flex items-center justify-center gap-2">
              <span className="bg-gradient-to-r from-pink-400 via-pink-500 to-purple-400 bg-clip-text text-transparent">
                Codes
              </span>
              <span className="text-[#2D1B3D]">mate</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-pink-400"
              >
                <FaHeart className="text-2xl" />
              </motion.span>
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-purple-600 text-sm mt-2 font-medium"
          >
            Find your perfect AI coding companion.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center justify-center gap-3 mt-1.5 text-xs text-purple-400"
          >
            <span className="flex items-center gap-1">✨ Learn</span>
            <span className="w-1 h-1 bg-pink-300 rounded-full" />
            <span className="flex items-center gap-1">💻 Build</span>
            <span className="w-1 h-1 bg-pink-300 rounded-full" />
            <span className="flex items-center gap-1">🚀 Debug</span>
            <span className="w-1 h-1 bg-pink-300 rounded-full" />
            <span className="flex items-center gap-1">💗 Grow Together</span>
          </motion.div>
        </div>

        {/* Quote */}
        <div className="text-center mb-8 min-h-[3rem]">
          <AnimatePresence mode="wait">
            <motion.p
              key={quote}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
              className="text-purple-600 text-sm italic font-light"
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
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/50 backdrop-blur-sm border-2 border-pink-300/50 text-purple-700 rounded-2xl font-semibold hover:bg-white/70 transition hover:scale-105 hover:shadow-lg"
            >
              <FaUserPlus className="text-pink-400" />
              Create Account
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* AI Pet */}
      <motion.div
        ref={petRef}
        className="fixed z-20 cursor-pointer"
        animate={{
          x: mousePosition.x - 120 + petPosition.x,
          y: mousePosition.y - 300 + petPosition.y,
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 80, 
          damping: 25
        }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setShowPetChat(!showPetChat)}
      >
        <div className="relative group">
          <div className="absolute inset-0 bg-pink-300/20 rounded-full blur-2xl animate-pulse" />
          
          <div className="relative w-24 h-24">
            <div className={`w-full h-full bg-gradient-to-br from-pink-200 via-purple-200 to-pink-300 rounded-full flex items-center justify-center shadow-2xl border-2 border-white/50 ${isPetSleeping ? 'scale-90' : ''}`}>
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute top-5 left-5 w-3 h-3.5 bg-white rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-purple-800 rounded-full" />
                </div>
                <div className="absolute top-5 right-5 w-3 h-3.5 bg-white rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-purple-800 rounded-full" />
                </div>
                <div className="absolute bottom-6 left-2 w-4 h-3 bg-pink-300/40 rounded-full blur-sm" />
                <div className="absolute bottom-6 right-2 w-4 h-3 bg-pink-300/40 rounded-full blur-sm" />
                <div className="absolute bottom-4 w-2 h-2 bg-pink-400 rounded-full" />
                <div className="absolute bottom-3 w-3 h-1.5 border-b-2 border-pink-400 rounded-full" />
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -bottom-1 -right-1 text-pink-400"
                >
                  <FaHeart className="text-sm drop-shadow-lg" />
                </motion.div>
              </div>
              <div className="absolute -top-3 -left-2 w-6 h-6 bg-gradient-to-b from-pink-200 to-purple-200 rounded-full rotate-12 border border-white/30" />
              <div className="absolute -top-3 -right-2 w-6 h-6 bg-gradient-to-b from-pink-200 to-purple-200 rounded-full -rotate-12 border border-white/30" />
            </div>

            <motion.div className="absolute -bottom-1 left-3 text-xs text-purple-400/50">🐾</motion.div>
            <motion.div className="absolute -bottom-1 right-3 text-xs text-purple-400/50">🐾</motion.div>

            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-purple-600 border border-pink-200 shadow-lg whitespace-nowrap">
              ✨ Pixel
              <span className="inline-block w-1.5 h-1.5 bg-pink-400 rounded-full ml-1 animate-pulse" />
            </div>

            {isPetSleeping && (
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-xs text-purple-500 bg-white/80 px-2 py-0.5 rounded-full">
                💤 Zzz...
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Pet Chat */}
      <AnimatePresence>
        {showPetChat && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            className="fixed bottom-32 right-8 w-80 bg-white/95 backdrop-blur-2xl rounded-3xl p-5 shadow-2xl border-2 border-pink-200/50 z-30"
          >
            <div className="flex items-center gap-3 mb-3 pb-3 border-b border-pink-100/50">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center text-xl shadow-md">
                🐱
              </div>
              <div>
                <div className="font-semibold text-purple-700 flex items-center gap-1.5">
                  Pixel AI
                  <span className="text-[10px] text-purple-400 font-normal">✨ 4.9</span>
                </div>
                <div className="text-xs text-purple-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
                  Online • Coding Buddy
                </div>
              </div>
            </div>

            <div className="max-h-52 overflow-y-auto space-y-2 mb-3 pr-1">
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
                placeholder="💭 Ask Pixel anything..."
                className="flex-1 px-4 py-2.5 rounded-full border-2 border-pink-200/50 focus:border-pink-400 outline-none transition bg-white/50 text-purple-700 text-sm placeholder-purple-300"
                onKeyPress={(e) => e.key === 'Enter' && handlePetChat()}
              />
              <button
                onClick={handlePetChat}
                className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-4 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg transition"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 text-purple-400/50">
        <span className="text-xs text-purple-300/50">© 2026 Codesmate</span>
      </div>

    </div>
  )
}

export default LoginPage