import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'
import { FaEnvelope, FaLock, FaSignInAlt, FaHeart, FaArrowRight } from 'react-icons/fa'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

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
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F7] via-[#FFE8EE] to-[#F8F0FF] flex items-center justify-center p-4">
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50"
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-3xl font-bold text-purple-800">Codesmate</span>
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaHeart className="text-pink-400 text-2xl" />
            </motion.span>
          </div>
          <h2 className="text-2xl font-bold text-purple-800">Welcome Back</h2>
          <p className="text-purple-500">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400">
              <FaEnvelope />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-pink-200 focus:border-pink-400 outline-none transition bg-white/50"
              placeholder="Email Address"
              required
            />
          </div>

          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400">
              <FaLock />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-12 py-3 rounded-2xl border-2 border-pink-200 focus:border-pink-400 outline-none transition bg-white/50"
              placeholder="Password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-600"
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-400 to-purple-400 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : (
              <>
                Sign In <FaSignInAlt className="text-white group-hover:rotate-12 transition" />
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-purple-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-pink-500 font-semibold hover:text-pink-600 transition flex items-center gap-1 inline-flex">
              Register <FaArrowRight className="text-xs" />
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-purple-400 flex items-center justify-center gap-1">
            <FaHeart className="text-pink-300 text-xs" />
            Find your perfect coding partner
            <FaHeart className="text-pink-300 text-xs" />
          </p>
        </div>

      </motion.div>
    </div>
  )
}

export default Login