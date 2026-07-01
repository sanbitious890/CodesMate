import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaHeart, FaUserPlus, FaSignInAlt, FaComments, FaSmile, FaPaw } from 'react-icons/fa'

const Homepage = () => {
  const navigate = useNavigate()
  const [petPosition, setPetPosition] = useState({ x: 0, y: 0 })
  const [petDirection, setPetDirection] = useState('right')
  const [showPetChat, setShowPetChat] = useState(false)
  const [petMessage, setPetMessage] = useState('')
  const [petResponse, setPetResponse] = useState('')
  const [quote, setQuote] = useState('✨ "Small progress is still progress."')
  const [isPetMoving, setIsPetMoving] = useState(true)

  const quotes = [
    '✨ "Small progress is still progress."',
    '🌸 "Believe you can and you\'re halfway there."',
    '💗 "You are capable of amazing things."',
    '🌷 "Every expert was once a beginner."',
    '🎀 "Your only limit is your imagination."',
  ]

  const petResponses = [
    'You\'re doing great! 💗',
    'I believe in you! 🌸',
    'Keep going, you\'re amazing! ✨',
    'You\'ve got this! 🎀',
    'I\'m so proud of you! 🌷',
    'Let\'s code together! 💻',
    'You\'re a star! ⭐',
    'Stay positive! 💕',
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
      setPetPosition(prev => {
        const newX = prev.x + (Math.random() - 0.5) * 80
        const newY = prev.y + (Math.random() - 0.5) * 60
        setPetDirection(newX > prev.x ? 'right' : 'left')
        return {
          x: Math.max(-200, Math.min(200, newX)),
          y: Math.max(-100, Math.min(100, newY))
        }
      })
    }, 1500)
    return () => clearInterval(moveInterval)
  }, [isPetMoving])

  const handlePetChat = () => {
    if (petMessage.trim()) {
      const response = petResponses[Math.floor(Math.random() * petResponses.length)]
      setPetResponse(response)
      setTimeout(() => setPetResponse(''), 3000)
      setPetMessage('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F7] via-[#FFE8EE] to-[#F8F0FF] relative overflow-hidden">
      
      {/* Professional Pink Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none"></div>

      {/* Floating Icons - Professional Style */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-10 left-10 text-4xl opacity-20"
        >
          <FaHeart className="text-pink-400" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute bottom-20 right-20 text-4xl opacity-20"
        >
          <FaPaw className="text-purple-400" />
        </motion.div>
        <motion.div
          animate={{ x: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
          className="absolute top-1/2 right-10 text-3xl opacity-20"
        >
          <FaSmile className="text-pink-300" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-10 left-20 text-3xl opacity-20"
        >
          <FaComments className="text-purple-300" />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        
        {/* Pet */}
        <div className="relative w-full max-w-md h-48 mb-4">
          <motion.div
            className="absolute"
            animate={{ 
              x: petPosition.x,
              y: petPosition.y,
            }}
            transition={{ type: 'spring', stiffness: 50, damping: 20 }}
          >
            <button
              onClick={() => setShowPetChat(!showPetChat)}
              className="group relative"
            >
              <div className="text-5xl hover:scale-110 transition-transform cursor-pointer">
                {petDirection === 'right' ? '🐰' : '🐰'}
              </div>
              {/* Cute little feet animation */}
              <div className="absolute -bottom-1 left-1 flex gap-1">
                <motion.span 
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="text-lg"
                >
                  🐾
                </motion.span>
                <motion.span 
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                  className="text-lg"
                >
                  🐾
                </motion.span>
              </div>
            </button>
          </motion.div>
        </div>

        {/* Pet Chat */}
        <AnimatePresence>
          {showPetChat && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white/90 backdrop-blur-lg rounded-2xl p-4 max-w-sm w-full shadow-2xl mb-4 border-2 border-pink-200"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🐰</span>
                <span className="font-semibold text-purple-700">Bunny says:</span>
              </div>
              {petResponse && (
                <p className="text-purple-600 text-sm mb-2 bg-pink-50 p-2 rounded-xl">
                  💗 {petResponse}
                </p>
              )}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={petMessage}
                  onChange={(e) => setPetMessage(e.target.value)}
                  placeholder="Tell Bunny how you feel..."
                  className="flex-1 px-4 py-2 rounded-full border-2 border-pink-200 focus:border-pink-400 outline-none text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && handlePetChat()}
                />
                <button
                  onClick={handlePetChat}
                  className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-4 py-2 rounded-full font-semibold hover:shadow-lg transition"
                >
                  Send 💕
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* App Name */}
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold text-[#5A4A6A] flex items-center justify-center gap-2">
            Codesmate
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaHeart className="text-pink-400 text-3xl" />
            </motion.span>
          </h1>
          <p className="text-[#8B7A9B] text-sm">Find your perfect coding partner</p>
        </div>

        {/* Quote */}
        <div className="text-center mb-8">
          <p className="text-purple-700 font-medium italic max-w-md">
            {quote}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4 max-w-sm w-full">
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-gradient-to-r from-pink-400 to-purple-400 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition flex items-center justify-center gap-2 group"
          >
            <FaSignInAlt className="text-white group-hover:rotate-12 transition" />
            Sign In
          </button>
          <button
            onClick={() => navigate('/register')}
            className="w-full bg-white/50 backdrop-blur-sm border-2 border-pink-300 text-purple-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/70 transition flex items-center justify-center gap-2"
          >
            <FaUserPlus className="text-pink-400" />
            Create Account
          </button>
        </div>

        {/* Footer */}
        <p className="text-purple-400 text-xs mt-6 flex items-center gap-1">
          <FaHeart className="text-pink-300 text-xs" />
          Join thousands of developers finding their perfect Codesmate
          <FaHeart className="text-pink-300 text-xs" />
        </p>

      </div>
    </div>
  )
}

export default Homepage