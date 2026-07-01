import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaHeart, FaCat, FaDog, FaRabbit, FaFox, FaPaw } from 'react-icons/fa'

const Homepage = () => {
  const navigate = useNavigate()
  const [pet, setPet] = useState('🐰')
  const [showPetSelector, setShowPetSelector] = useState(false)
  const [quote, setQuote] = useState('✨ "Small progress is still progress."')
  const [pinkShade, setPinkShade] = useState(0)

  const pets = [
    { emoji: '🐰', name: 'Bunny' },
    { emoji: '🐱', name: 'Cat' },
    { emoji: '🐶', name: 'Dog' },
    { emoji: '🦊', name: 'Fox' },
    { emoji: '🐼', name: 'Panda' },
  ]

  const quotes = [
    '✨ "Small progress is still progress."',
    '🌸 "Believe you can and you\'re halfway there."',
    '💗 "You are capable of amazing things."',
    '🌷 "Every expert was once a beginner."',
    '🎀 "Your only limit is your imagination."',
  ]

  useEffect(() => {
    // Change quote every 5 seconds
    const quoteInterval = setInterval(() => {
      setQuote(quotes[Math.floor(Math.random() * quotes.length)])
    }, 5000)
    return () => clearInterval(quoteInterval)
  }, [])

  useEffect(() => {
    // Animate pink shade
    const colorInterval = setInterval(() => {
      setPinkShade((prev) => (prev + 1) % 360)
    }, 50)
    return () => clearInterval(colorInterval)
  }, [])

  const handleSignIn = () => {
    navigate('/login')
  }

  const handleSignUp = () => {
    navigate('/register')
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, 
          hsl(${pinkShade}, 80%, 90%) 0%, 
          hsl(${(pinkShade + 30) % 360}, 80%, 85%) 25%, 
          hsl(${(pinkShade + 60) % 360}, 80%, 95%) 50%, 
          hsl(${(pinkShade + 90) % 360}, 80%, 88%) 75%, 
          hsl(${(pinkShade + 120) % 360}, 80%, 92%) 100%)`
      }}
    >
      {/* 3D Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl animate-float">🌸</div>
        <div className="absolute top-20 right-20 text-5xl animate-float delay-1000">✨</div>
        <div className="absolute bottom-20 left-20 text-6xl animate-float delay-2000">💗</div>
        <div className="absolute bottom-10 right-10 text-5xl animate-float delay-1500">🌷</div>
        <div className="absolute top-1/2 left-1/4 text-4xl animate-float delay-500">🎀</div>
        <div className="absolute top-1/3 right-1/4 text-4xl animate-float delay-2500">🌟</div>
      </div>

      <div className="relative z-10 max-w-2xl w-full bg-white/30 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
        
        {/* Pet Section */}
        <div className="text-center mb-6">
          <div 
            className="text-7xl cursor-pointer hover:scale-110 transition-transform animate-bounce"
            onClick={() => setShowPetSelector(!showPetSelector)}
          >
            {pet}
          </div>
          <p className="text-sm text-purple-600 mt-1">Tap to change your pet 🎀</p>
          
          {showPetSelector && (
            <div className="flex justify-center gap-3 mt-3 flex-wrap">
              {pets.map((p) => (
                <button
                  key={p.name}
                  onClick={() => {
                    setPet(p.emoji)
                    setShowPetSelector(false)
                  }}
                  className={`text-3xl p-2 rounded-full hover:bg-pink-200 transition ${pet === p.emoji ? 'bg-pink-200 ring-2 ring-pink-400' : ''}`}
                >
                  {p.emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quote */}
        <div className="text-center mb-8">
          <p className="text-xl text-purple-800 font-medium italic">
            {quote}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <button
            onClick={handleSignIn}
            className="w-full bg-gradient-to-r from-pink-400 to-purple-400 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition"
          >
            🌸 Sign In
          </button>
          <button
            onClick={handleSignUp}
            className="w-full bg-white/50 backdrop-blur-sm border-2 border-pink-300 text-purple-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/70 transition"
          >
            💗 Create Account
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-purple-500 text-sm mt-6">
          Join thousands of developers finding their perfect Codesmate 💕
        </p>

      </div>
    </div>
  )
}

export default Homepage