import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { FaHeart, FaEnvelope, FaLock, FaGoogle, FaGithub, FaArrowRight } from 'react-icons/fa'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts(prev => [...prev, {
        id: Date.now(),
        x: Math.random() * 100,
        size: Math.random() * 16 + 8,
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 2,
      }])
      setTimeout(() => setHearts(prev => prev.slice(1)), 5000)
    }, 300)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F7] via-[#FFE8EE] to-[#F8F0FF] relative overflow-hidden flex items-center justify-center p-4">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: '100%', x: `${heart.x}%`, opacity: 0 }}
          animate={{ y: '-10%', opacity: 0.3 }}
          transition={{ duration: heart.duration, delay: heart.delay }}
          className="absolute text-pink-300/40"
          style={{ fontSize: heart.size, left: `${heart.x}%` }}
        >
          <FaHeart />
        </motion.div>
      ))}

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-md w-full"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold flex items-center justify-center gap-2">
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Codes</span>
            <span className="text-[#2D1B3D]">mate</span>
            <FaHeart className="text-pink-400" />
          </h1>
          <p className="text-purple-600 mt-2">Welcome back! Sign in to continue.</p>
        </div>

        <div className="bg-white/30 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/40">
          {error && <div className="bg-red-50 text-red-500 p-3 rounded-xl text-sm mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-purple-700 text-sm font-medium mb-1.5">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-pink-200/50 focus:border-pink-400 outline-none transition bg-white/40 text-purple-800 placeholder-purple-300"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-purple-700 text-sm font-medium mb-1.5">Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-pink-200/50 focus:border-pink-400 outline-none transition bg-white/40 text-purple-800 placeholder-purple-300"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-400 to-purple-400 text-white px-8 py-3.5 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center text-purple-500">
            Don't have an account? <Link to="/signup" className="text-pink-500 font-semibold hover:underline">Create one</Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default LoginPage