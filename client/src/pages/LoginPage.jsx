import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { 
  FaHeart, FaSignInAlt, FaUserPlus, FaSparkles, 
  FaCode, FaRocket, FaStar, FaComments, FaPaw,
  FaTwitter, FaGithub, FaGoogle, FaCat, FaDog,
  FaRabbit, FaFox, FaPaw as FaPawIcon
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
  const [selectedPet, setSelectedPet] = useState('🐱')
  const [showPetSelector, setShowPetSelector] = useState(false)
  const [petName, setPetName] = useState('Pixel')
  const [tailWag, setTailWag] = useState(0)
  const [petEmotion, setPetEmotion] = useState('happy')
  const petRef = useRef(null)

  const pets = [
    { emoji: '🐱', name: 'Pixel', color: 'from-pink-200 to-purple-200' },
    { emoji: '🐶', name: 'Mochi', color: 'from-orange-200 to-yellow-200' },
    { emoji: '🐰', name: 'Lumi', color: 'from-purple-200 to-blue-200' },
    { emoji: '🦊', name: 'Yuki', color: 'from-orange-300 to-red-200' },
    { emoji: '🐼', name: 'Momo', color: 'from-gray-200 to-gray-300' },
  ]

  const quotes = [
    '"Small steps build amazing developers." — Unknown',
    '"Code is poetry written in logic." — Unknown',
    '"Every expert was once a beginner." — Unknown',
    '"The best way to predict the future is to build it." — Unknown',
    '"Learning to code is learning to create." — Unknown',
    '"Great coders are made, not born." — Unknown',
    '"Simplicity is the ultimate sophistication." — Leonardo da Vinci',
    '"First, solve the problem. Then, write the code." — John Johnson',
  ]

  const petResponses = {
    code: [
      "Here's how to center a div in CSS:\n\n```css\n.parent {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n}\n```",
      "To create a React component:\n\n```jsx\nfunction MyComponent() {\n  return <div>Hello World!</div>;\n}\n```",
      "Here's a JavaScript function:\n\n```javascript\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n```"
    ],
    explain: [
      "Flexbox is a layout model that allows responsive elements within a container. Use `display: flex` to activate it.",
      "React hooks like `useState` and `useEffect` let you manage state and side effects in functional components.",
      "CSS Grid is a powerful layout system for creating complex, responsive designs with rows and columns."
    ],
    encourage: [
      "You're doing amazing! Keep going! 💗",
      "I believe in you! Every expert was once a beginner 🌸",
      "You've got this! Let's build something incredible! 🚀"
    ],
    greet: [
      "Hello! I'm Pixel! Ready to code? 💻",
      "Nice to meet you! Let's build something amazing! ✨",
      "Hi there! How can I help you today? 💗"
    ]
  }

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setQuote(quotes[Math.floor(Math.random() * quotes.length)])
    }, 15000)
    return () => clearInterval(quoteInterval)
  }, [])

  useEffect(() => {
    const moveInterval = setInterval(() => {
      const newX = (Math.random() - 0.5) * 100
      const newY = (Math.random() - 0.5) * 80
      setPetPosition({ x: newX, y: newY })
      
      const states = ['idle', 'jump', 'wave', 'spin', 'stretch', 'happy', 'giggle']
      const newState = states[Math.floor(Math.random() * states.length)]
      setPetState(newState)
      
      // Tail wagging
      setTailWag(prev => (prev + 1) % 360)
      
      // Random emotions
      const emotions = ['happy', 'excited', 'curious', 'sleepy']
      if (Math.random() < 0.3) {
        setPetEmotion(emotions[Math.floor(Math.random() * emotions.length)])
      }
      
      if (Math.random() < 0.08) {
        setIsPetSleeping(true)
        setPetState('sleep')
        setTimeout(() => {
          setIsPetSleeping(false)
          setPetState('wake')
          setPetEmotion('happy')
        }, 4000)
      }
      
      setTimeout(() => {
        if (!isPetSleeping) setPetState('idle')
      }, 1500)
    }, 3000)
    return () => clearInterval(moveInterval)
  }, [isPetSleeping])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handlePetChat = async () => {
    if (petMessage.trim()) {
      setIsTyping(true)
      
      // Simple AI responses based on keywords
      let response = ""
      const msg = petMessage.toLowerCase()
      
      if (msg.includes('center') || msg.includes('align') || msg.includes('div')) {
        response = petResponses.code[0]
      } else if (msg.includes('react') || msg.includes('component')) {
        response = petResponses.code[1]
      } else if (msg.includes('function') || msg.includes('javascript')) {
        response = petResponses.code[2]
      } else if (msg.includes('flexbox')) {
        response = petResponses.explain[0]
      } else if (msg.includes('hook') || msg.includes('usestate') || msg.includes('useeffect')) {
        response = petResponses.explain[1]
      } else if (msg.includes('grid')) {
        response = petResponses.explain[2]
      } else if (msg.includes('hello') || msg.includes('hi')) {
        response = petResponses.greet[Math.floor(Math.random() * petResponses.greet.length)]
      } else if (msg.includes('good') || msg.includes('great') || msg.includes('amazing')) {
        response = petResponses.encourage[Math.floor(Math.random() * petResponses.encourage.length)]
      } else {
        response = "That's a great question! Let me think about that... 🤔\n\nI'm still learning, but I can help with coding questions, debugging, and project ideas. Try asking me about React, CSS, JavaScript, or anything coding-related! 💡"
      }
      
      setTimeout(() => {
        setChatHistory([
          ...chatHistory,
          { user: petMessage, pet: response }
        ])
        setPetMessage('')
        setIsTyping(false)
        setPetState('happy')
        setPetEmotion('excited')
        setTimeout(() => {
          setPetState('idle')
          setPetEmotion('happy')
        }, 1500)
      }, 1000 + Math.random() * 1500)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setPetState('happy')
    setPetEmotion('excited')
    
    const result = await login(email, password)
    setLoading(false)
    if (result.success) {
      setTimeout(() => {
        setPetState('happy')
        navigate('/dashboard')
      }, 1500)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F7] via-[#FFE8EE] to-[#F8F0FF] relative overflow-hidden flex items-center justify-center p-4">
      
      {/* 3D Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200/20 via-purple-200/20 to-pink-300/20 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-300/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-300/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Floating Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -40, 0],
              x: [0, 20, 0],
              opacity: [0.2, 0.5, 0.2],
              rotate: [0, 10, 0]
            }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, delay: i * 1.5 }}
            className="absolute"
            style={{
              top: `${5 + i * 12}%`,
              left: `${3 + i * 10}%`,
            }}
          >
            <FaHeart className={`text-pink-300/20 text-${4 + i % 3}xl`} />
          </motion.div>
        ))}
        
        {/* Floating Sparkles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.5, 0]
            }}
            transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.8 }}
            className="absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          >
            <FaStar className="text-pink-300/30 text-lg" />
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
        
        {/* Logo - Calligraphy Style */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-6xl font-bold flex items-center justify-center gap-2 font-['Dancing_Script','cursive']">
              <span className="bg-gradient-to-r from-pink-400 via-pink-500 to-purple-400 bg-clip-text text-transparent">
                Codes
              </span>
              <span className="text-[#2D1B3D]">mate</span>
              <motion.span
                animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-pink-400"
              >
                <FaHeart className="text-3xl" />
              </motion.span>
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-purple-600 text-sm mt-2 font-['Dancing_Script','cursive']"
          >
            ✨ Find your coding companion ✨
          </motion.p>
        </div>

        {/* Quote - Cursive, Changing */}
        <div className="text-center mb-8 min-h-[5rem]">
          <AnimatePresence mode="wait">
            <motion.p
              key={quote}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1 }}
              className="text-purple-600 text-lg italic font-['Dancing_Script','cursive'] max-w-sm mx-auto"
            >
              {quote || '"Small steps build amazing developers." — Unknown'}
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
              whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(236, 72, 153, 0.3)' }}
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
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/50 backdrop-blur-sm border-2 border-pink-300/50 text-purple-700 rounded-2xl font-semibold hover:bg-white/70 transition hover:scale-105 hover:shadow-lg group"
            >
              <FaUserPlus className="text-pink-400 group-hover:rotate-12 transition" />
              Create Account
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* AI Pet - Moving Like Real Pet */}
      <motion.div
        ref={petRef}
        className="fixed z-20"
        animate={{
          x: mousePosition.x - 100 + petPosition.x,
          y: mousePosition.y - 280 + petPosition.y,
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 60, 
          damping: 20,
          mass: 0.8
        }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setShowPetChat(!showPetChat)}
      >
        <div className="relative group">
          {/* Pet Glow */}
          <div className="absolute inset-0 bg-pink-300/20 rounded-full blur-2xl animate-pulse" />
          <div className="absolute inset-0 bg-purple-300/10 rounded-full blur-xl animate-pulse delay-1000" />
          
          {/* Pet Container */}
          <div className="relative w-28 h-28">
            <div className={`w-full h-full bg-gradient-to-br from-pink-200 via-purple-200 to-pink-300 rounded-full flex items-center justify-center shadow-2xl border-2 border-white/50 ${isPetSleeping ? 'scale-90' : ''}`}>
              {/* Pet Face */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Sparkling Eyes */}
                <motion.div 
                  className="absolute top-5 left-5 w-3.5 h-4 bg-white rounded-full flex items-center justify-center"
                  animate={petState === 'sleep' ? { scaleY: 0.1 } : { scaleY: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div 
                    className="w-2 h-2 bg-purple-800 rounded-full"
                    animate={petState === 'happy' ? { scale: [1, 1.5, 1] } : {}}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  />
                </motion.div>
                <motion.div 
                  className="absolute top-5 right-5 w-3.5 h-4 bg-white rounded-full flex items-center justify-center"
                  animate={petState === 'sleep' ? { scaleY: 0.1 } : { scaleY: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div 
                    className="w-2 h-2 bg-purple-800 rounded-full"
                    animate={petState === 'happy' ? { scale: [1, 1.5, 1] } : {}}
                    transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                  />
                </motion.div>

                {/* Blush Cheeks */}
                <motion.div 
                  className="absolute bottom-6 left-2 w-4 h-3 bg-pink-300/40 rounded-full blur-sm"
                  animate={petState === 'happy' ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute bottom-6 right-2 w-4 h-3 bg-pink-300/40 rounded-full blur-sm"
                  animate={petState === 'happy' ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                />

                {/* Tiny Nose */}
                <motion.div 
                  className="absolute bottom-4 w-2.5 h-2.5 bg-pink-400 rounded-full"
                  animate={petState === 'giggle' ? { scale: [1, 1.5, 1] } : {}}
                  transition={{ duration: 0.3 }}
                />

                {/* Smile */}
                <motion.div 
                  className="absolute bottom-3 w-4 h-2 border-b-2 border-pink-400 rounded-full"
                  animate={petState === 'happy' ? { width: 6, height: 3 } : petState === 'giggle' ? { width: 8, height: 4 } : {}}
                  transition={{ duration: 0.3 }}
                />

                {/* Heart Pendant */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -bottom-1 -right-1 text-pink-400"
                >
                  <FaHeart className="text-sm drop-shadow-lg" />
                </motion.div>
              </div>

              {/* Fluffy Ears */}
              <motion.div 
                className="absolute -top-3 -left-2 w-7 h-7 bg-gradient-to-b from-pink-200 to-purple-200 rounded-full rotate-12 border border-white/30"
                animate={{ rotate: [12, 20, 12] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div 
                className="absolute -top-3 -right-2 w-7 h-7 bg-gradient-to-b from-pink-200 to-purple-200 rounded-full -rotate-12 border border-white/30"
                animate={{ rotate: [-12, -20, -12] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />

              {/* Tail Wagging */}
              <motion.div
                className="absolute -bottom-2 -right-4 text-xl"
                animate={{ rotate: [0, 30, 0, -30, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                🐾
              </motion.div>
            </div>

            {/* Tiny Paws */}
            <motion.div 
              className="absolute -bottom-1 left-2 text-xs text-purple-400/50"
              animate={petState === 'happy' ? { x: [0, 3, 0, -3, 0] } : {}}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              🐾
            </motion.div>
            <motion.div 
              className="absolute -bottom-1 right-2 text-xs text-purple-400/50"
              animate={petState === 'happy' ? { x: [0, -3, 0, 3, 0] } : {}}
              transition={{ duration: 0.5, repeat: Infinity, delay: 0.25 }}
            >
              🐾
            </motion.div>

            {/* Name Tag */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-purple-600 border border-pink-200 shadow-lg whitespace-nowrap"
            >
              ✨ {petName}
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block w-1.5 h-1.5 bg-pink-400 rounded-full ml-1"
              />
            </motion.div>

            {/* Emotion Indicator */}
            {petEmotion !== 'happy' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-14 left-1/2 transform -translate-x-1/2 text-xs text-purple-500 bg-white/80 px-2 py-0.5 rounded-full"
              >
                {petEmotion === 'excited' ? '🤩 Excited!' :
                 petEmotion === 'curious' ? '🤔 Curious...' :
                 petEmotion === 'sleepy' ? '💤 Zzz...' : ''}
              </motion.div>
            )}

            {/* State Animation */}
            {petState !== 'idle' && !isPetSleeping && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-14 left-1/2 transform -translate-x-1/2 text-xs text-purple-500 bg-white/80 px-2 py-0.5 rounded-full"
              >
                {petState === 'happy' ? '💗 Happy!' :
                 petState === 'giggle' ? '😆 Giggling!' :
                 petState === 'jump' ? '⬆️ Jump!' :
                 petState === 'wave' ? '👋 Wave!' :
                 petState === 'spin' ? '🔄 Spin!' :
                 petState === 'stretch' ? '🧘 Stretch!' : ''}
              </motion.div>
            )}

            {isPetSleeping && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-xs text-purple-500 bg-white/80 px-2 py-0.5 rounded-full"
              >
                💤 Zzz...
              </motion.div>
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
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-32 right-8 w-80 max-h-[500px] bg-white/95 backdrop-blur-2xl rounded-3xl p-5 shadow-2xl border-2 border-pink-200/50 z-30 flex flex-col"
          >
            {/* Chat Header */}
            <div className="flex items-center gap-3 mb-3 pb-3 border-b border-pink-100/50 flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center text-xl shadow-md">
                🐱
              </div>
              <div>
                <div className="font-semibold text-purple-700 flex items-center gap-1.5">
                  {petName} AI
                  <span className="text-[10px] text-purple-400 font-normal">✨ 4.9</span>
                </div>
                <div className="text-xs text-purple-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
                  Online • Coding Buddy
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto max-h-52 space-y-2 mb-3 pr-1 custom-scrollbar">
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
                  <div className="text-sm text-purple-700 bg-purple-50 p-3 rounded-2xl rounded-br-none border border-purple-100/50 whitespace-pre-wrap font-mono text-xs">
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
            <div className="flex gap-2 flex-shrink-0">
              <input
                type="text"
                value={petMessage}
                onChange={(e) => {
                  setPetMessage(e.target.value)
                  if (e.target.value.length > 0) {
                    setPetState('happy')
                    setPetEmotion('curious')
                    setTimeout(() => setPetState('idle'), 500)
                  }
                }}
                placeholder="💭 Ask anything..."
                className="flex-1 px-4 py-2.5 rounded-full border-2 border-pink-200/50 focus:border-pink-400 outline-none transition bg-white/50 text-purple-700 text-sm placeholder-purple-300"
                onKeyPress={(e) => e.key === 'Enter' && handlePetChat()}
              />
              <motion.button
                onClick={handlePetChat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-4 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg transition flex-shrink-0"
              >
                Send
              </motion.button>
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