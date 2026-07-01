import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { 
  FaHeart, FaSignInAlt, FaUserPlus, FaSparkles, FaMagic, 
  FaCode, FaRocket, FaStar, FaComments, FaPaw 
} from 'react-icons/fa'
import { BiChip, BiBrain } from 'react-icons/bi'

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
  const [isPetMoving, setIsPetMoving] = useState(true)
  const [petLookAt, setPetLookAt] = useState('center')
  const [showSparkles, setShowSparkles] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const petRef = useRef(null)

  const quotes = [
    '"Small steps build amazing developers."',
    '"Code is poetry written in logic."',
    '"Every expert was once a beginner."',
    '"The best way to predict the future is to build it."',
    '"Learning to code is learning to create."',
  ]

  const petResponses = [
    'You\'re doing amazing! 💫',
    'I believe in you! 🌸',
    'Keep going, you\'re a star! ✨',
    'That\'s a great question! 💡',
    'Let me think about that... 🧠',
    'You\'re so smart! 🎀',
    'I\'m here to help you! 💗',
    'You\'ve got this! 🚀',
  ]

  const codingTips = [
    '💻 try using useState for state management',
    '🚀 remember to use useEffect for side effects',
    '💡 keep your components small and focused',
    '🌈 always use meaningful variable names',
    '✨ practice makes perfect!',
  ]

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setQuote(quotes[Math.floor(Math.random() * quotes.length)])
    }, 5000)
    return () => clearInterval(quoteInterval)
  }, [])

  useEffect(() => {
    if (!isPetMoving) return
    
    const moveInterval = setInterval(() => {
      const newX = (Math.random() - 0.5) * 60
      const newY = (Math.random() - 0.5) * 40
      setPetPosition({ x: newX, y: newY })
      setPetState(['idle', 'jump', 'wave', 'spin'][Math.floor(Math.random() * 4)])
      setTimeout(() => setPetState('idle'), 1000)
    }, 3000)
    return () => clearInterval(moveInterval)
  }, [isPetMoving])

  useEffect(() => {
    // Track mouse for pet interaction
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      if (petRef.current) {
        const rect = petRef.current.getBoundingClientRect()
        const petCenterX = rect.left + rect.width / 2
        const petCenterY = rect.top + rect.height / 2
        const angle = Math.atan2(e.clientY - petCenterY, e.clientX - petCenterX)
        setPetLookAt(angle > 0 ? 'right' : 'left')
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handlePetChat = () => {
    if (petMessage.trim()) {
      const response = petResponses[Math.floor(Math.random() * petResponses.length)]
      const tip = codingTips[Math.floor(Math.random() * codingTips.length)]
      setChatHistory([
        ...chatHistory,
        { user: petMessage, pet: `${response}\n${tip}` }
      ])
      setPetMessage('')
      setPetState('excited')
      setTimeout(() => setPetState('idle'), 1500)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setShowSparkles(true)
    const result = await login(email, password)
    setLoading(false)
    if (result.success) {
      setPetState('celebrate')
      setTimeout(() => navigate('/dashboard'), 1500)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F7] via-[#FFE8EE] to-[#F8F0FF] relative overflow-hidden flex items-center justify-center p-4">
      
      {/* Premium Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Blobs */}
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-0 right-0 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -80, 0], y: [0, 60, 0] }}
          transition={{ duration: 25, repeat: Infinity, delay: 5 }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, 80, 0] }}
          transition={{ duration: 30, repeat: Infinity, delay: 10 }}
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-300/10 rounded-full blur-3xl"
        />

        {/* Floating Hearts */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -20, 0], x: [0, 10, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
            className="absolute opacity-20"
            style={{
              top: `${10 + i * 10}%`,
              left: `${5 + i * 12}%`,
            }}
          >
            <FaHeart className={`text-pink-400 text-${2 + i % 3}xl`} />
          </motion.div>
        ))}

        {/* Floating Sparkles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
            className="absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          >
            <FaStar className={`text-pink-300 text-${1 + i % 2}xl`} />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-md w-full"
      >
        
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold flex items-center justify-center gap-2 font-sans">
            <span className="bg-gradient-to-r from-pink-400 via-pink-500 to-purple-400 bg-clip-text text-transparent">
              Codes
            </span>
            <span className="text-purple-800">mate</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-pink-400"
            >
              <FaHeart className="text-3xl" />
            </motion.span>
          </h1>
          <p className="text-purple-600 text-sm mt-2 font-medium">
            Find your perfect AI coding companion.
          </p>
          <div className="flex items-center justify-center gap-2 mt-1 text-xs text-purple-400">
            <FaSparkles className="text-pink-300" />
            <span>Learn • Build • Debug • Grow Together</span>
            <FaSparkles className="text-pink-300" />
          </div>
        </div>

        {/* Quote */}
        <div className="text-center mb-8">
          <motion.p
            key={quote}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="text-purple-600 text-sm italic"
          >
            {quote || '"Small steps build amazing developers."'}
          </motion.p>
        </div>

        {/* Login Form */}
        <div className="bg-white/30 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-purple-700 text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-pink-200 focus:border-pink-400 outline-none transition bg-white/50 text-purple-800"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-purple-700 text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-pink-200 focus:border-pink-400 outline-none transition bg-white/50 text-purple-800"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-400 to-purple-400 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition flex items-center justify-center gap-2 disabled:opacity-50 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                {loading ? 'Signing in...' : (
                  <>
                    Sign In
                    <FaSignInAlt className="group-hover:rotate-12 transition" />
                  </>
                )}
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-20 transition"
              />
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/50 backdrop-blur-sm border-2 border-pink-300 text-purple-700 rounded-2xl font-semibold hover:bg-white/70 transition hover:scale-105"
            >
              <FaUserPlus className="text-pink-400" />
              Create Account
            </Link>
          </div>
        </div>

        {/* AI Pet */}
        <motion.div
          ref={petRef}
          className="absolute -bottom-12 -right-12 cursor-pointer z-20"
          animate={{
            x: petPosition.x,
            y: petPosition.y,
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => setShowPetChat(!showPetChat)}
        >
          <div className="relative">
            {/* Pet Glow */}
            <div className="absolute inset-0 bg-pink-300/20 rounded-full blur-xl animate-pulse" />
            
            {/* Pet Body */}
            <div className="relative w-24 h-24 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center shadow-2xl border-2 border-white/50">
              <div className="text-4xl">
                {petState === 'celebrate' ? '🎉' : 
                 petState === 'excited' ? '🤩' :
                 petState === 'jump' ? '⬆️' :
                 petState === 'wave' ? '👋' :
                 petState === 'spin' ? '🔄' :
                 '🐱'}
              </div>
              {/* Blush */}
              <div className="absolute -bottom-1 left-1 text-sm opacity-50">🌸</div>
              <div className="absolute -bottom-1 right-1 text-sm opacity-50">🌸</div>
              {/* Tiny paws */}
              <div className="absolute -bottom-2 left-2 text-sm">🐾</div>
              <div className="absolute -bottom-2 right-2 text-sm">🐾</div>
            </div>

            {/* Name Tag */}
            <div className="absolute -top-2 -right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs font-semibold text-purple-600 border border-pink-200">
              Pixel ✨
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
              className="absolute bottom-24 right-0 w-72 bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border-2 border-pink-200 z-30"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🐱</span>
                <span className="font-semibold text-purple-700">Pixel AI</span>
                <span className="text-xs text-purple-400">💡 Coding Buddy</span>
              </div>
              
              <div className="max-h-40 overflow-y-auto space-y-2 mb-2">
                {chatHistory.map((chat, i) => (
                  <div key={i}>
                    <p className="text-xs text-purple-600 bg-pink-50 p-2 rounded-xl">💬 {chat.user}</p>
                    <p className="text-xs text-purple-700 bg-purple-50 p-2 rounded-xl mt-1">🤖 {chat.pet}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={petMessage}
                  onChange={(e) => setPetMessage(e.target.value)}
                  placeholder="Ask me anything... 💭"
                  className="flex-1 px-3 py-2 rounded-full border-2 border-pink-200 focus:border-pink-400 outline-none text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && handlePetChat()}
                />
                <button
                  onClick={handlePetChat}
                  className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-3 py-2 rounded-full text-xs font-semibold hover:shadow-lg transition"
                >
                  Send
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  )
}

export default LoginPage