import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const login = async (email, password) => {
    setLoading(true)
    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1000))
    setUser({ email, name: 'Test User' })
    setLoading(false)
    return { success: true }
  }

  const signup = async (name, email, password) => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setUser({ email, name })
    setLoading(false)
    return { success: true }
  }

  const logout = () => {
    setUser(null)
  }

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}