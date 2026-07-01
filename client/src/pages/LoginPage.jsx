import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { FaHeart, FaSignInAlt, FaUserPlus, FaEdit, FaCheck } from 'react-icons/fa'
import MochiSVG from '../components/MochiSVG'

const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [quote, setQuote] = useState('')
  const [showChat, setShowChat] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { id: 1, type: 'ai', content: "Hi!! I'm Mochi! 🐶\nYour AI coding buddy!\nWhat shall we build today? 💗", timestamp: new Date() }
  ])
  const [chatInput, setChatInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [petName, setPetName] = useState('Mochi')
  const [isEditingName, setIsEditingName] = useState(false)
  const [tempName, setTempName] = useState('')
  const [hearts, setHearts] = useState([])
  const messagesEndRef = useRef(null)

  // ===== FLOATING HEARTS =====
  useEffect(() => {
    const heartInterval = setInterval(() => {
      const newHeart = {
        id: Date.now(),
        x: Math.random() * 100,
        size: Math.random() * 18 + 8,
        speed: Math.random() * 2 + 1.5,
        delay: Math.random() * 2,
        opacity: Math.random() * 0.3 + 0.2,
        rotate: Math.random() * 360,
      }
      setHearts(prev => [...prev, newHeart])
      setTimeout(() => {
        setHearts(prev => prev.filter(h => h.id !== newHeart.id))
      }, 5000)
    }, 300)
    return () => clearInterval(heartInterval)
  }, [])

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
    scrollToBottom()
  }, [chatMessages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const result = await login(email, password)
    setLoading(false)
    if (result.success) {
      navigate('/dashboard')
    }
  }

  const handleNameChange = () => {
    if (tempName.trim()) {
      setPetName(tempName.trim())
      setIsEditingName(false)
    }
  }

  const getAIResponse = (msg) => {
    const m = msg.toLowerCase()
    if (m.includes('code') || m.includes('how to')) {
      return `Great question! Let me help you with that! 💻\n\nHere's a simple example:\n\n\`\`\`javascript\nfunction solution() {\n  // Your code here\n}\n\`\`\`\n\nLet me know if you need more details! 💗`
    }
    if (m.includes('debug') || m.includes('error') || m.includes('bug')) {
      return `Don't worry! Let's debug together! 🔍\n\n1. Check the error message\n2. Look at the line number\n3. Identify the root cause\n4. Implement the fix\n\nWhat's the error you're seeing? 💗`
    }
    if (m.includes('react')) {
      return `React is amazing! ⚛️\n\n• useState: Manage state\n• useEffect: Handle side effects\n• Props: Pass data between components\n\nWant me to explain any of these? 💗`
    }
    if (m.includes('hello') || m.includes('hi')) {
      return `Hey there! 👋 So excited to code with you!\n\nWhat are we building today? I'm ready to help! 💻💗`
    }
    if (m.includes('project')) {
      return `Building projects is the best way to learn! 🚀\n\n1. Plan your project\n2. Set up the environment\n3. Build the core features\n4. Add polish and deploy\n\nWhat kind of project are you building? 💗`
    }
    return `That's a great question! 🤔\n\nI can help with:\n• 💻 Coding questions\n• 🔍 Debugging\n• 📚 DSA practice\n• 🚀 Project ideas\n• 💗 Career advice\n\nWhat would you like to know more about?`
  }

  const handleSendChat = () => {
    if (!chatInput.trim()) return

    const userMsg = {
      id: Date.now(),
      type: 'user',
      content: chatInput,
      timestamp: new Date()
    }
    setChatMessages(prev => [...prev, userMsg])
    setChatInput('')
    setIsTyping(true)

    setTimeout(() => {
      const response = getAIResponse(chatInput)
      const aiMsg = {
        id: Date.now() + 1,
        type: 'ai',
        content: response,
        timestamp: new Date()
      }
      setChatMessages(prev => [...prev, aiMsg])
      setIsTyping(false)
    }, 1000 + Math.random() * 1500)
  }

  return (
    <div 
      className="min-h-screen relative overflow-hidden flex items-center justify-center p-4"
      style={{
        background: 'radial-gradient(ellipse at 30% 20%, #FFF0F5 0%, #FFE4E9 25%, #FFD6E7 50%, #FFC8D8 75%, #FFB6C6 100%)',
      }}
    >
      {/* ===== 3D PINK GLOW EFFECTS ===== */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl animate-pulse" style={{ background: '#FFD6E7', opacity: 0.4 }} />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl animate-pulse delay-1000" style={{ background: '#FFB6C6', opacity: 0.3 }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl animate-pulse delay-2000" style={{ background: '#FFE4E9', opacity: 0.2 }} />
      </div>

      {/* ===== FLOATING HEARTS ===== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ y: '110%', opacity: 0, rotate: heart.rotate, scale: 0 }}
            animate={{ y: '-10%', opacity: heart.opacity, rotate: heart.rotate + 360, scale: 1 }}
            transition={{ duration: heart.speed * 2.5, delay: heart.delay, ease: "easeOut" }}
            className="absolute"
            style={{ left: `${heart.x}%`, fontSize: `${heart.size}px` }}
          >
            <FaHeart className="text-pink-300/50 drop-shadow-lg" />
          </motion.div>
        ))}
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-md w-full"
      >
        {/* Logo */}
        <div className="text-center mb-4">
          <h1 className="text-5xl font-bold flex items-center justify-center gap-2">
            <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">Codes</span>
            <span className="text-[#4A2B3D]">mate</span>
            <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 3, repeat: Infinity }} className="text-pink-400">
              <FaHeart className="text-3xl" />
            </motion.span>
          </h1>
          <p className="text-pink-500 text-sm mt-2">✨ Find your coding companion ✨</p>
        </div>

        {/* Quote */}
        <div className="text-center mb-6 min-h-[3rem]">
          <AnimatePresence mode="wait">
            <motion.p
              key={quote}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1 }}
              className="text-pink-600 text-lg italic max-w-sm mx-auto"
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
          className="bg-white/40 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/60"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-pink-700 text-sm font-medium mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl border-2 border-pink-200/60 focus:border-pink-400 outline-none transition bg-white/50 text-pink-800 placeholder-pink-300"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-pink-700 text-sm font-medium mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl border-2 border-pink-200/60 focus:border-pink-400 outline-none transition bg-white/50 text-pink-800 placeholder-pink-300"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-400/60 hover:text-pink-600 transition"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-400 to-rose-400 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg transition-all duration-300 disabled:opacity-50 hover:scale-105"
            >
              {loading ? 'Signing in...' : <>Sign In <FaSignInAlt className="inline ml-2" /></>}
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/50 backdrop-blur-sm border-2 border-pink-300/50 text-pink-700 rounded-2xl font-semibold hover:bg-white/70 transition hover:scale-105"
            >
              <FaUserPlus className="text-pink-400" /> Create Account
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* ===== MOCHI COMPANION ===== */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
        className="fixed bottom-8 right-8 z-20 flex flex-col items-end"
      >
        {/* Chat Box */}
        <AnimatePresence>
          {showChat && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border-2 border-pink-200/50 w-80 max-h-[400px] flex flex-col mb-3 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-3 border-b border-pink-100/50 bg-gradient-to-r from-pink-50 to-rose-50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-200 to-rose-200 rounded-full flex items-center justify-center text-lg">🐶</div>
                  <div>
                    {isEditingName ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="text"
                          value={tempName}
                          onChange={(e) => setTempName(e.target.value)}
                          className="text-sm font-semibold text-pink-700 bg-white/50 border border-pink-200 rounded px-1 w-20"
                          autoFocus
                          onKeyPress={(e) => e.key === 'Enter' && handleNameChange()}
                        />
                        <button onClick={handleNameChange} className="text-pink-400 hover:text-pink-600">
                          <FaCheck className="text-xs" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-semibold text-pink-700">💖 {petName}</span>
                        <button onClick={() => { setTempName(petName); setIsEditingName(true); }} className="text-pink-400 hover:text-pink-600">
                          <FaEdit className="text-xs" />
                        </button>
                      </div>
                    )}
                    <div className="text-[10px] text-pink-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block animate-pulse" />
                      Online
                    </div>
                  </div>
                </div>
                <button onClick={() => setShowChat(false)} className="text-pink-400 hover:text-pink-600 transition">✕</button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2 max-h-48">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-2 rounded-2xl ${msg.type === 'user' ? 'bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-br-none' : 'bg-pink-50 text-pink-700 rounded-bl-none'}`}>
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                      <span className="text-[8px] opacity-50 mt-0.5 block">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-pink-50 text-pink-400 p-2 rounded-2xl rounded-bl-none">
                      <span className="inline-flex gap-1">
                        <span className="animate-bounce">•</span>
                        <span className="animate-bounce delay-100">•</span>
                        <span className="animate-bounce delay-200">•</span>
                      </span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              <div className="px-3 py-1.5 flex gap-1.5 flex-wrap border-t border-pink-100/50">
                {['Explain Code', 'Debug Error', 'DSA Help', 'Project Ideas'].map((action) => (
                  <button
                    key={action}
                    onClick={() => { setChatInput(action); setTimeout(handleSendChat, 100) }}
                    className="text-[10px] px-2 py-1 rounded-full bg-pink-50 text-pink-600 hover:bg-pink-100 transition border border-pink-200"
                  >
                    {action}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="p-2 border-t border-pink-100/50 bg-white/50">
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendChat()}
                    placeholder="💭 Ask Mochi..."
                    className="flex-1 px-3 py-1.5 rounded-full border-2 border-pink-200/50 focus:border-pink-400 outline-none transition bg-white/50 text-pink-700 text-sm placeholder-pink-300"
                  />
                  <button
                    onClick={handleSendChat}
                    disabled={!chatInput.trim()}
                    className="bg-gradient-to-r from-pink-400 to-rose-400 text-white px-3 py-1.5 rounded-full text-sm font-semibold hover:shadow-lg transition disabled:opacity-50"
                  >
                    Send
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mochi Avatar */}
        <motion.div
          className="cursor-pointer relative group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowChat(!showChat)}
        >
          <div className="w-20 h-20 relative">
            <div className="absolute inset-0 bg-pink-300/20 rounded-full blur-xl animate-pulse" />
            <MochiSVG state="idle" expression="happy" />
          </div>
          <div className="absolute -top-1 -right-1 bg-pink-400 text-white text-[8px] px-1.5 py-0.5 rounded-full animate-pulse">💬</div>
        </motion.div>

        <p className="text-xs text-pink-500 font-semibold mt-1 bg-white/50 px-2 py-0.5 rounded-full">💖 {petName}</p>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-pink-300/50">
        © 2026 Codesmate
      </div>
    </div>
  )
}

export default LoginPage