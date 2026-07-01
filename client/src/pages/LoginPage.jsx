import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { FaHeart, FaSignInAlt, FaUserPlus } from 'react-icons/fa'
import MochiSVG from '../components/MochiSVG'

const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [quote, setQuote] = useState('')

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const result = await login(email, password)
    setLoading(false)
    if (result.success) {
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F7] via-[#FFE8EE] to-[#F8F0FF] relative overflow-hidden flex items-center justify-center p-4">
      
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200/20 via-purple-200/20 to-pink-300/20 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-300/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-300/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-md w-full"
      >
        {/* Logo */}
        <div className="text-center mb-4">
          <h1 className="text-5xl font-bold flex items-center justify-center gap-2">
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
          <p className="text-purple-600 text-sm mt-2">
            ✨ Find your coding companion ✨
          </p>
        </div>

        {/* MOCHI SVG - ADDED HERE */}
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24">
            <MochiSVG state="idle" expression="happy" />
          </div>
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
              className="text-purple-600 text-lg italic max-w-sm mx-auto"
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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-400 via-pink-500 to-purple-400 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg transition-all duration-300 disabled:opacity-50 hover:scale-105"
            >
              {loading ? 'Signing in...' : (
                <>
                  Sign In
                  <FaSignInAlt className="inline ml-2" />
                </>
              )}
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/50 backdrop-blur-sm border-2 border-pink-300/50 text-purple-700 rounded-2xl font-semibold hover:bg-white/70 transition hover:scale-105"
            >
              <FaUserPlus className="text-pink-400" />
              Create Account
            </Link>
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-purple-300/50">
        © 2026 Codesmate
      </div>

    </div>
  )
}

export default LoginPage