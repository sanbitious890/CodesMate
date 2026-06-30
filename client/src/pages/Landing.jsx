import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FaBell, FaSearch, FaHeart, FaComment, FaUser, FaHome, FaCompass, FaBook, FaRegSmile, FaGithub, FaCode } from 'react-icons/fa'
import { IoMdChatbubbles } from 'react-icons/io'
import { HiSparkles } from 'react-icons/hi'

const Landing = () => {
  const { user, isAuthenticated } = useAuth()
  const [greeting, setGreeting] = useState('')
  const [showHearts, setShowHearts] = useState(false)

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good Morning')
    else if (hour < 17) setGreeting('Good Afternoon')
    else setGreeting('Good Evening')
  }, [])

  // Floating hearts effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowHearts(true)
      setTimeout(() => setShowHearts(false), 2000)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF5F7] via-[#FFF9FB] to-[#F8F0FF] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 text-4xl animate-float">🌸</div>
        <div className="absolute top-20 right-20 text-3xl animate-float delay-1000">🎀</div>
        <div className="absolute bottom-20 left-20 text-4xl animate-float delay-2000">✨</div>
        <div className="absolute bottom-10 right-10 text-3xl animate-float delay-1500">🌷</div>
        <div className="absolute top-1/2 left-1/4 text-2xl animate-float delay-500">💗</div>
        <div className="absolute top-1/3 right-1/4 text-2xl animate-float delay-2500">🌼</div>
        {showHearts && (
          <>
            <div className="absolute top-1/2 left-1/2 text-6xl animate-float">💗</div>
            <div className="absolute top-1/3 left-1/3 text-4xl animate-float">✨</div>
          </>
        )}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">

        {/* ===== TOP HEADER ===== */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#5A4A6A] dark:text-white">
              {greeting}, {isAuthenticated ? user?.name || 'Saniya' : 'Saniya'} 🌷
            </h1>
            <p className="text-[#8B7A9B] dark:text-gray-300 text-sm md:text-base">
              Who are we building with today? 💗
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-[#8B7A9B] dark:text-gray-300 hover:text-[#FF8FB1] transition text-xl">
              <FaBell />
            </button>
            <img 
              src={user?.profilePic || 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg'} 
              alt="Profile" 
              className="w-10 h-10 rounded-full border-2 border-[#FFD6E7] dark:border-gray-600 object-cover"
            />
          </div>
        </div>

        {/* ===== SEARCH BAR ===== */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="🔍 Find your coding soulmate..."
            className="w-full px-6 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border-2 border-[#FFD6E7] dark:border-gray-700 shadow-lg focus:outline-none focus:border-[#FF8FB1] dark:focus:border-pink-400 transition text-[#5A4A6A] dark:text-white placeholder-[#B8A8C8] dark:placeholder-gray-400"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#FF8FB1] to-[#E8DFFF] text-white px-6 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all hover:scale-105">
            Find 🌸
          </button>
        </div>

        {/* ===== DAILY QUOTE CARD ===== */}
        <div className="bg-gradient-to-r from-[#FFD6E7]/30 to-[#E8DFFF]/30 dark:from-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm rounded-[30px] p-6 mb-8 border-2 border-white/50 dark:border-gray-700/50 shadow-lg">
          <p className="text-[#5A4A6A] dark:text-white text-lg italic">
            ✨ "Small progress is still progress." 
          </p>
          <Link 
            to={isAuthenticated ? "/dashboard" : "/register"} 
            className="inline-block mt-3 bg-gradient-to-r from-[#FF8FB1] to-[#E8DFFF] text-white px-6 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all hover:scale-105"
          >
            Find Partner 💌
          </Link>
        </div>

        {/* ===== STUDY BUDDY CARDS ===== */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#5A4A6A] dark:text-white mb-4 flex items-center gap-2">
            🌸 Study Buddies <span className="text-sm font-normal text-[#8B7A9B] dark:text-gray-400">(Suggested for you)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Aanya', role: 'Frontend Developer', vibe: 'Loves late-night coding ☕', skills: ['React', 'Figma', 'Java'], emoji: '🌸' },
              { name: 'Priya', role: 'Full Stack Dev', vibe: 'Morning coder 🌅', skills: ['Node', 'MongoDB', 'React'], emoji: '💻' },
              { name: 'Riya', role: 'UI/UX Designer', vibe: 'Pinterest girl 🎨', skills: ['Figma', 'Tailwind', 'Photoshop'], emoji: '🎀' },
            ].map((buddy, i) => (
              <div key={i} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-[24px] p-5 border-2 border-[#FFD6E7] dark:border-gray-700 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-[#5A4A6A] dark:text-white">{buddy.emoji} {buddy.name}</h3>
                    <p className="text-sm text-[#8B7A9B] dark:text-gray-300">{buddy.role}</p>
                    <p className="text-xs text-[#B8A8C8] dark:text-gray-400 mt-1">{buddy.vibe}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {buddy.skills.map((skill, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-[#FFD6E7]/30 dark:bg-gray-700/50 text-[#8B7A9B] dark:text-gray-300 text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button className="bg-gradient-to-r from-[#FF8FB1] to-[#E8DFFF] text-white px-4 py-1 rounded-full text-xs font-semibold hover:shadow-lg transition-all hover:scale-105">
                    Match 💗
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== EXPLORE BY INTEREST ===== */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#5A4A6A] dark:text-white mb-4">💖 Explore by Interest</h2>
          <div className="flex flex-wrap gap-3">
            {['🌸 Web Dev', '🐻 DSA', '🎀 UI/UX', '☁️ AI', '📚 Study Buddy', '🎮 Game Dev', '💗 Open Source', '📱 Mobile'].map((tag, i) => (
              <span key={i} className="px-4 py-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-full border-2 border-[#FFD6E7] dark:border-gray-700 text-[#5A4A6A] dark:text-white text-sm hover:border-[#FF8FB1] dark:hover:border-pink-400 transition cursor-pointer hover:shadow-lg">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ===== ACTIVE NOW ===== */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#5A4A6A] dark:text-white mb-4">🌼 Active Now</h2>
          <div className="flex gap-4">
            {['👩‍💻', '👨‍💻', '🧑‍💻', '👩‍🎨', '🧑‍🎨'].map((emoji, i) => (
              <div key={i} className="relative">
                <div className="w-14 h-14 bg-white/80 dark:bg-gray-800/80 rounded-full flex items-center justify-center text-2xl border-2 border-[#FFD6E7] dark:border-gray-700 shadow-md">
                  {emoji}
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-gray-800"></div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== FOCUS ROOMS ===== */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#5A4A6A] dark:text-white mb-4">🌙 Focus Rooms</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['☕ 50/10 Pomodoro', '👩‍💻 Night Coders', '📚 Exam Prep'].map((room, i) => (
              <div key={i} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-[24px] p-4 border-2 border-[#FFD6E7] dark:border-gray-700 shadow-lg text-center hover:shadow-xl transition-all">
                <p className="text-[#5A4A6A] dark:text-white font-semibold">{room}</p>
                <button className="mt-2 bg-gradient-to-r from-[#FF8FB1] to-[#E8DFFF] text-white px-4 py-1 rounded-full text-xs font-semibold hover:shadow-lg transition-all hover:scale-105">
                  Join 🌸
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ===== RECENT POSTS ===== */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#5A4A6A] dark:text-white mb-4">💌 Recent Posts</h2>
          <div className="space-y-3">
            {[
              'Looking for a girl teammate for a hackathon! 🎀',
              'Anyone learning Flutter together? 💗',
              'Building a study app — need UI/UX help 🌸'
            ].map((post, i) => (
              <div key={i} className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-[20px] p-4 border-2 border-[#FFD6E7] dark:border-gray-700 shadow-md hover:shadow-lg transition">
                <p className="text-[#5A4A6A] dark:text-white">💬 {post}</p>
                <div className="flex gap-3 mt-2 text-xs text-[#B8A8C8] dark:text-gray-400">
                  <span>❤️ 12</span>
                  <span>💬 5</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== BOTTOM NAVIGATION ===== */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-t-2 border-[#FFD6E7] dark:border-gray-700 px-6 py-3 flex justify-around items-center max-w-6xl mx-auto rounded-t-[30px] shadow-lg">
          <button className="text-[#FF8FB1] text-xl"><FaHome /></button>
          <button className="text-[#B8A8C8] dark:text-gray-500 text-xl hover:text-[#FF8FB1] transition"><FaCompass /></button>
          <button className="text-[#B8A8C8] dark:text-gray-500 text-xl hover:text-[#FF8FB1] transition"><IoMdChatbubbles /></button>
          <button className="text-[#B8A8C8] dark:text-gray-500 text-xl hover:text-[#FF8FB1] transition"><FaBook /></button>
          <Link to="/profile" className="text-[#B8A8C8] dark:text-gray-500 text-xl hover:text-[#FF8FB1] transition"><FaUser /></Link>
        </div>

        {/* ===== SPACER FOR BOTTOM NAV ===== */}
        <div className="h-24"></div>

      </div>
    </div>
  )
}

export default Landing