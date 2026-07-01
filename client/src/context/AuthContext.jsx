import React, { createContext, useContext, useState, useEffect } from 'react'
import { 
  auth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  GithubAuthProvider,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const signUpWithEmail = async (email, password, name) => {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(result.user, { displayName: name })
    return result
  }

  const signInWithEmail = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password)
  }

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    return await signInWithPopup(auth, provider)
  }

  const signInWithGitHub = async () => {
    const provider = new GithubAuthProvider()
    return await signInWithPopup(auth, provider)
  }

  const logout = async () => {
    return await signOut(auth)
  }

  const value = {
    user,
    userData,
    setUserData,
    loading,
    signUpWithEmail,
    signInWithEmail,
    signInWithGoogle,
    signInWithGitHub,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}