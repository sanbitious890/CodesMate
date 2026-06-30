import React, { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem('token'))

  // Set axios default header
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      delete axios.defaults.headers.common['Authorization']
    }
  }, [token])

  // Load user on mount
  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const res = await axios.get('http://localhost:5000/api/users/me')
        setUser(res.data)
      } catch (error) {
        console.error('Error loading user:', error)
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [token])

  // Register user
  const register = async (userData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', userData)
      const { token, ...userDataWithoutToken } = res.data
      localStorage.setItem('token', token)
      setToken(token)
      setUser(userDataWithoutToken)
      toast.success('Registration successful! 🎉')
      return { success: true }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed')
      return { success: false, error: error.response?.data?.message }
    }
  }

  // Login user
  const login = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password })
      const { token, ...userDataWithoutToken } = res.data
      localStorage.setItem('token', token)
      setToken(token)
      setUser(userDataWithoutToken)
      toast.success('Welcome back! 👋')
      return { success: true }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed')
      return { success: false, error: error.response?.data?.message }
    }
  }

  // Logout user
  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    toast.success('Logged out successfully')
  }

  // Update user
  const updateUser = async (userData) => {
    try {
      const res = await axios.put('http://localhost:5000/api/users/me', userData)
      setUser(res.data)
      toast.success('Profile updated! ✅')
      return { success: true }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed')
      return { success: false }
    }
  }

  const value = {
    user,
    loading,
    token,
    register,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}