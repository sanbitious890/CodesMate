import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { 
  FaHeart, FaSignInAlt, FaUserPlus, FaSparkles, 
  FaCode, FaRocket, FaStar, FaComments, FaPaw,
  FaTwitter, FaGithub, FaGoogle
} from 'react-icons/fa'
import { BiChip, BiBrain } from 'react-icons/bi'
import { GiButterfly, GiFlowerEmblem } from 'react-icons/gi'

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
  const [petLookAt, setPetLookAt] = useState('center')
  const [isPetMoving, setIsPetMoving] = useState(true)
  const [showSparkles, setShowSparkles] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isTyping, setIsTyping] = useState(false)
  const [isPetSleeping, setIsPetSleeping] = useState(false)
  const [petActivity, setPetActivity] = useState('')
  const petRef = useRef(null)

  const quotes = [
    '"Small steps build amazing developers."',
    '"Code is poetry written in logic."',
    '"Every expert was once a beginner."',
    '"The best way to predict the future is to build it."',
    '"Learning to code is learning to create."',
    '"Great coders are made, not born."',
    '"Simplicity is the ultimate sophistication."',
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
    '🎯 Focus on one thing at a time',
    '📚 Read the documentation!',
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
      const newX = (Math.random() - 0.5) * 80
      const newY = (Math.random() - 0.5) * 60
      setPetPosition({ x: newX, y: newY })
      
      const states = ['idle', 'jump', 'wave', 'spin', 'stretch', 'look_around']
      const newState = states[Math.floor(Math.random() * states.length)]
      setPetState(newState)
      
      if (newState === 'look_around') {
        setPetLookAt(['left', 'right', 'center'][Math.floor(Math.random() * 3)])
      }
      
      // Random sleep
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
  }, [isPetMoving, isPetSleeping])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      if (petRef.current && !isPetSleeping) {
        const rect = petRef.current.getBoundingClientRect()
        const petCenterX = rect.left + rect.width / 2
        const petCenterY = rect.top + rect.height / 2
        const angle = Math.atan2(e.clientY - petCenterY, e.clientX - petCenterX)
        setPetLookAt(angle > 0.5 ? 'right' : angle < -0.5 ? 'left' : 'center')
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isPetSleeping])

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
    setShowSparkles(true)
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
      
      {/* Premium Background Gradients - Slowly Animating */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            background: [
              'radial-gradient(circle at 20% 20%, rgba(255,182,193,0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 80%, rgba(216,180,254,0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(255,218,185,0.12) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 80%, rgba(255,182,193,0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(216,180,254,0.15) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        />
      </div>

      {/* Premium Floating Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Blurry Hearts */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            animate={{ 
              y: [0, -30, 0],
              x: [0, 15, 0],
              rotate: [0, 8, 0],
              opacity: [0.4, 0.6, 0.4]
            }}
            transition={{ 
              duration: 6 + i * 1.5, 
              repeat: Infinity,
              delay: i * 1.2,
              ease: "easeInOut"
            }}
            className="absolute opacity-30"
            style={{
              top: `${5 + i * 15}%`,
              left: `${3 + i * 14}%`,
            }}
          >
            <FaHeart className={`text-pink-300/30 text-${4 + i % 3}xl`} />
          </motion.div>
        ))}

        {/* Floating Butterflies */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`butterfly-${i}`}
            animate={{
              x: [0, 40, 0, -40, 0],
              y: [0, -20, 0, 20, 0],
              rotate: [0, 10, -10, 5, 0]
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              delay: i * 3,
              ease: "easeInOut"
            }}
            className="absolute opacity-20"
            style={{
              top: `${20 + i * 20}%`,
              left: `${10 + i * 22}%`,
            }}
          >
            <GiButterfly className={`text-pink-400/30 text-${3 + i % 2}xl`} />
          </motion.div>
        ))}

        {/* Floating Petals */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`petal-${i}`}
            animate={{
              y: [0, -50, 0],
              x: [0, 20, -20, 10, 0],
              rotate: [0, 15, -10, 5, 0]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut"
            }}
            className="absolute opacity-20"
            style={{
              top: `${10 + i * 10}%`,
              left: `${5 + i * 12}%`,
            }}
          >
            <GiFlowerEmblem className={`text-pink-300/30 text-${2 + i % 3}xl`} />
          </motion.div>
        ))}

        {/* Glowing Dots */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`dot-${i}`}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut"
            }}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: `rgba(216, 180, 254, ${0.2 + Math.random() * 0.3})`
            }}
          />
        ))}

        {/* Soft Curved Doodles */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-1/4 opacity-10"
        >
          <svg width="200" height="200" viewBox="0 0 200 200">
            <path d="M50,100 Q100,20 150,100 T200,100" stroke="#FFB6C1" strokeWidth="2" fill="none"/>
            <path d="M0,120 Q50,80 100,120 T200,120" stroke="#D8B4FE" strokeWidth="2" fill="none"/>
          </svg>
        </motion.div>
      </div>

      {/* Premium Sparkles */}
      {showSparkles && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ 
                scale: [0, 1, 0],
                opacity: [1, 0.5, 0],
                x: [0, (Math.random() - 0.5) * 200],
                y: [0, (Math.random() - 0.5) * 200]
              }}
              transition={{ duration: 1.5, delay: i * 0.1 }}
              className="absolute"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            >
              <FaStar className="text-pink-400 text-lg" />
            </motion.div>
          ))}
        </div>
      )}

      {/* Main Content */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-md w-full"
      >
        
        {/* Premium Logo */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-5xl font-bold flex items-center justify-center gap-2 font-sans tracking-tight">
              <span className="bg-gradient-to-r from-pink-400 via-pink-500 to-purple-400 bg-clip-text text-transparent">
                Codes
              </span>
              <span className="text-[#2D1B3D]">mate</span>
              <motion.span
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-pink-400 relative"
              >
                <FaHeart className="text-2xl" />
                <motion.div
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-2 h-2 bg-pink-300 rounded-full"
                />
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
            <span className="flex items-center gap-1">
              <FaSparkles className="text-pink-300 text-[10px]" />
              Learn
            </span>
            <span className="w-1 h-1 bg-pink-300 rounded-full" />
            <span className="flex items-center gap-1">
              <FaCode className="text-purple-300 text-[10px]" />
              Build
            </span>
            <span className="w-1 h-1 bg-pink-300 rounded-full" />
            <span className="flex items-center gap-1">
              <FaRocket className="text-pink-300 text-[10px]" />
              Debug
            </span>
            <span className="w-1 h-1 bg-pink-300 rounded-full" />
            <span className="flex items-center gap-1">
              <FaHeart className="text-pink-300 text-[10px]" />
              Grow Together
            </span>
          </motion.div>
        </div>

        {/* Premium Quote */}
        <div className="text-center mb-8 min-h-[3rem]">
          <AnimatePresence mode="wait">
            <motion.p
              key={quote}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="text-purple-600 text-sm italic font-light"
            >
              {quote || '"Small steps build amazing developers."'}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Premium Glass Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/30 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/40 relative overflow-hidden"
        >
          {/* Glass Reflection */}
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-3xl" />
          
          <form onSubmit={handleSubmit} className="space-y-5 relative">
            <div>
              <label className="block text-purple-700 text-sm font-medium mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl border-2 border-pink-200/50 focus:border-pink-400 outline-none transition bg-white/40 backdrop-blur-sm text-purple-800 placeholder-purple-300"
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
                  className="w-full px-4 py-3.5 rounded-2xl border-2 border-pink-200/50 focus:border-pink-400 outline-none transition bg-white/40 backdrop-blur-sm text-purple-800 placeholder-purple-300"
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
              whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(236, 72, 153, 0.3)' }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? 'Signing in...' : (
                  <>
                    Sign In
                    <FaSignInAlt className="group-hover:rotate-12 transition transform" />
                  </>
                )}
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-20 transition"
                animate={loading ? { opacity: [0, 1, 0] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.button>
          </form>

          <div className="mt-4 text-center">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/50 backdrop-blur-sm border-2 border-pink-300/50 text-purple-700 rounded-2xl font-semibold hover:bg-white/70 transition hover:scale-105 hover:shadow-lg group"
            >
              <FaUserPlus className="text-pink-400 group-hover:rotate-12 transition" />
              Create Account
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Premium AI Pet - Pixel */}
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
          damping: 25,
          mass: 0.5
        }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setShowPetChat(!showPetChat)}
      >
        <div className="relative group">
          {/* Pet Glow */}
          <div className="absolute inset-0 bg-pink-300/20 rounded-full blur-2xl animate-pulse" />
          <div className="absolute inset-0 bg-purple-300/10 rounded-full blur-xl animate-pulse delay-1000" />
          
          {/* Pet Container */}
          <div className="relative w-24 h-24">
            {/* Pixar-style Body */}
            <div className={`w-full h-full bg-gradient-to-br from-pink-200 via-purple-200 to-pink-300 rounded-full flex items-center justify-center shadow-2xl border-2 border-white/50 transition-all duration-300 ${isPetSleeping ? 'scale-90' : ''}`}>
              {/* Pet Face */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Sparkling Eyes */}
                <motion.div 
                  className="absolute top-5 left-5 w-3 h-3.5 bg-white rounded-full flex items-center justify-center"
                  animate={petState === 'sleep' ? { scaleY: 0.1 } : { scaleY: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-1.5 h-1.5 bg-purple-800 rounded-full" />
                </motion.div>
                <motion.div 
                  className="absolute top-5 right-5 w-3 h-3.5 bg-white rounded-full flex items-center justify-center"
                  animate={petState === 'sleep' ? { scaleY: 0.1 } : { scaleY: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-1.5 h-1.5 bg-purple-800 rounded-full" />
                </motion.div>

                {/* Blush Cheeks */}
                <div className="absolute bottom-6 left-2 w-4 h-3 bg-pink-300/40 rounded-full blur-sm" />
                <div className="absolute bottom-6 right-2 w-4 h-3 bg-pink-300/40 rounded-full blur-sm" />

                {/* Tiny Nose */}
                <div className="absolute bottom-4 w-2 h-2 bg-pink-400 rounded-full" />

                {/* Small Smile */}
                <motion.div 
                  className="absolute bottom-3 w-3 h-1.5 border-b-2 border-pink-400 rounded-full"
                  animate={petState === 'excited' ? { width: 4, height: 2 } : {}}
                  transition={{ duration: 0.3 }}
                />

                {/* Heart Pendant */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -bottom-1 -right-1 text-pink-400"
                >
                  <FaHeart className="text-sm drop-shadow-lg" />
                </motion.div>
              </div>

              {/* Fluffy Ears */}
              <div className="absolute -top-3 -left-2 w-6 h-6 bg-gradient-to-b from-pink-200 to-purple-200 rounded-full rotate-12 border border-white/30" />
              <div className="absolute -top-3 -right-2 w-6 h-6 bg-gradient-to-b from-pink-200 to-purple-200 rounded-full -rotate-12 border border-white/30" />

              {/* Tiny Wings */}
              <motion.div
                animate={{ rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -left-6 top-1/2 transform -translate-y-1/2 opacity-30"
              >
                <span className="text-sm">🕊️</span>
              </motion.div>
              <motion.div
                animate={{ rotate: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute -right-6 top-1/2 transform -translate-y-1/2 opacity-30"
              >
                <span className="text-sm">🕊️</span>
              </motion.div>
            </div>

            {/* Tiny Paws */}
            <motion.div 
              className="absolute -bottom-1 left-3 text-xs text-purple-400/50"
              animate={petState === 'walk' ? { x: [0, 2, 0, -2, 0] } : {}}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              🐾
            </motion.div>
            <motion.div 
              className="absolute -bottom-1 right-3 text-xs text-purple-400/50"
              animate={petState === 'walk' ? { x: [0, -2, 0, 2, 0] } : {}}
              transition={{ duration: 0.5, repeat: Infinity, delay: 0.25 }}
            >
              🐾
            </motion.div>

            {/* Name Tag */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-purple-600 border border-pink-200 shadow-lg whitespace-nowrap"
            >
              ✨ Pixel
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block w-1.5 h-1.5 bg-pink-400 rounded-full ml-1"
              />
            </motion.div>

            {/* State Indicator */}
            {petState !== 'idle' && !isPetSleeping && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-xs text-purple-500 bg-white/80 px-2 py-0.5 rounded-full"
              >
                {petState === 'excited' ? '🤩 Excited!' :
                 petState === 'jump' ? '⬆️ Jump!' :
                 petState === 'wave' ? '👋 Wave!' :
                 petState === 'spin' ? '🔄 Spin!' :
                 petState === 'stretch' ? '🧘 Stretch!' :
                 petState === 'celebrate' ? '🎉 Celebrate!' :
                 petState === 'look_around' ? '👀 Looking...' : ''}
              </motion.div>
            )}

            {isPetSleeping && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-xs text-purple-500 bg-white/80 px-2 py-0.5 rounded-full"
              >
                💤 Zzz...
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Premium Pet Chat */}
      <AnimatePresence>
        {showPetChat && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-32 right-8 w-80 bg-white/95 backdrop-blur-2xl rounded-3xl p-5 shadow-2xl border-2 border-pink-200/50 z-30"
          >
            {/* Chat Header */}
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

            {/* Chat Messages */}
            <div className="max-h-52 overflow-y-auto space-y-2 mb-3 pr-1 custom-scrollbar">
              {chatHistory.map((chat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-1.5"
                >
                  <div className="text-sm text-purple-700 bg-pink-50 p-3 rounded-2xl rounded-bl-none border border-pink-100/50">
                    💬 {chat.user}
                  </div>
                  <div className="text-sm text-purple-700 bg-purple-50 p-3 rounded-2xl rounded-br-none border border-purple-100/50 whitespace-pre-wrap">
                    🤖 {chat.pet}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-purple-400 bg-purple-50 p-3 rounded-2xl rounded-br-none border border-purple-100/50"
                >
                  🤖 <span className="inline-flex gap-1">
                    <motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>•</motion.span>
                    <motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.15 }}>•</motion.span>
                    <motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.3 }}>•</motion.span>
                  </span>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={petMessage}
                onChange={(e) => {
                  setPetMessage(e.target.value)
                  if (e.target.value.length > 0) {
                    setPetState('excited')
                    setTimeout(() => setPetState('idle'), 500)
                  }
                }}
                placeholder="💭 Ask Pixel anything..."
                className="flex-1 px-4 py-2.5 rounded-full border-2 border-pink-200/50 focus:border-pink-400 outline-none transition bg-white/50 text-purple-700 text-sm placeholder-purple-300"
                onKeyPress={(e) => e.key === 'Enter' && handlePetChat()}
              />
              <motion.button
                onClick={handlePetChat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-4 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg transition"
              >
                Send
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium Social Login */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 text-purple-400/50">
        <motion.button
          whileHover={{ scale: 1.1, color: '#EC4899' }}
          transition={{ duration: 0.2 }}
          className="text-sm"
        >
          <FaGoogle />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1, color: '#EC4899' }}
          transition={{ duration: 0.2 }}
          className="text-sm"
        >
          <FaGithub />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1, color: '#EC4899' }}
          transition={{ duration: 0.2 }}
          className="text-sm"
        >
          <FaTwitter />
        </motion.button>
        <span className="text-xs text-purple-300/50">•</span>
        <span className="text-xs text-purple-300/50">© 2026 Codesmate</span>
      </div>

      {/* Custom Cursor */}
      <motion.div
        className="fixed pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{ duration: 0.1 }}
      >
        <div className="w-6 h-6 rounded-full border-2 border-pink-400/30 bg-pink-400/10 backdrop-blur-sm flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-pink-400/60" />
        </div>
        <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full border border-pink-400/10 animate-pulse" />
      </motion.div>

      {/* Paw Prints Trail */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`paw-${i}`}
          className="fixed pointer-events-none z-40 text-purple-300/20"
          animate={{
            x: [mousePosition.x - 30 + i * 20, mousePosition.x + 10 + i * 20],
            y: [mousePosition.y - 20 + i * 10, mousePosition.y + 10 + i * 10],
            opacity: [0.3, 0]
          }}
          transition={{ duration: 2, delay: i * 0.5 }}
        >
          🐾
        </motion.div>
      ))}

    </div>
  )
}

export default LoginPage