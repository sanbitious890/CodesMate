import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FaSearch, FaHeart, FaStar, FaUsers, FaCode, FaUserFriends, FaComments, FaBookOpen } from 'react-icons/fa'
import { MdPeople } from 'react-icons/md'

const Landing = () => {
  const { user, isAuthenticated } = useAuth()
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good Morning')
    else if (hour < 17) setGreeting('Good Afternoon')
    else setGreeting('Good Evening')
  }, [])

  const matches = [
    { 
      name: 'Aanya Sharma', 
      role: 'Featured Developer', 
      rating: 4.8, 
      skills: ['React', 'Figma', 'Tailwind'],
      bio: 'Love building cute UI and late night code talks',
      badge: '🌟 Top Rated'
    },
    { 
      name: 'Rohan Verma', 
      role: 'Booked Developer', 
      rating: 4.9, 
      skills: ['Node.js', 'MongoDB', 'Express'],
      bio: 'Building scalable apps and love anime',
      badge: '🔥 Hot Pick'
    },
    { 
      name: 'Ishita Singh', 
      role: 'UI/UX Designer', 
      rating: 4.7, 
      skills: ['Figma', 'Adobe XD', 'Prototyping'],
      bio: 'Designing beautiful UI and coffee addict',
      badge: '🎨 Creative'
    },
  ]

  const interests = ['Web Dev', 'DSA', 'UI/UX', 'AI/ML', 'Game Dev', 'Study Buddy']
  const rooms = [
    { name: '50/10 Pomodoro', members: 24 },
    { name: 'Night Coders', members: 18 },
    { name: 'Exam Prep Hub', members: 31 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF5F7] via-white to-[#FFF9FB] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-6 pb-32">
      
      <div className="max-w-5xl mx-auto">

        {/* ===== HEADER ===== */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#5A4A6A] dark:text-white flex items-center gap-2">
              Codesmate <span className="text-pink-400"><FaHeart className="inline text-pink-400" /></span>
            </h1>
            <p className="text-[#8B7A9B] dark:text-gray-300 text-sm">
              Find your coding partner, build together
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-[#8B7A9B] dark:text-gray-300 hover:text-pink-400 transition">
              <FaHeart className="text-xl" />
            </button>
            <img 
              src={user?.profilePic || 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg'} 
              alt="Profile" 
              className="w-10 h-10 rounded-full border-2 border-pink-200 object-cover"
            />
          </div>
        </div>

        {/* ===== SEARCH ===== */}
        <div className="relative mb-8">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B8A8C8]">
            <FaSearch />
          </div>
          <input
            type="text"
            placeholder="Search skills, projects or people..."
            className="w-full pl-12 pr-4 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border-2 border-[#FFD6E7] dark:border-gray-700 shadow-lg focus:outline-none focus:border-pink-400 text-[#5A4A6A] dark:text-white placeholder-[#B8A8C8]"
          />
        </div>

        {/* ===== HERO ===== */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-gray-800/50 dark:to-gray-800/50 rounded-3xl p-8 mb-8 text-center border border-pink-100 shadow-lg">
          <h2 className="text-2xl font-bold text-[#5A4A6A] dark:text-white mb-2">
            Great ideas need the right people.
          </h2>
          <p className="text-[#8B7A9B] dark:text-gray-300 mb-4">
            Find your perfect Codesmate and build something amazing!
          </p>
          <Link 
            to={isAuthenticated ? "/dashboard" : "/register"} 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition"
          >
            <FaSearch /> Find Codesmate
          </Link>
        </div>

        {/* ===== INTERESTS ===== */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold text-[#5A4A6A] dark:text-white">Explore by Interest</h2>
            <button className="text-sm text-pink-400 hover:text-pink-500">See all</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {interests.map((tag, i) => (
              <span key={i} className="px-4 py-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-full border-2 border-[#FFD6E7] dark:border-gray-700 text-[#5A4A6A] dark:text-white text-sm hover:border-pink-400 transition cursor-pointer">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ===== TOP MATCHES ===== */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold text-[#5A4A6A] dark:text-white">Top Matches for You</h2>
            <button className="text-sm text-pink-400 hover:text-pink-500">See all</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {matches.map((match, i) => (
              <div key={i} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-5 border-2 border-[#FFD6E7] dark:border-gray-700 shadow-md hover:shadow-xl transition">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-[#5A4A6A] dark:text-white">{match.name}</h3>
                    <p className="text-xs text-pink-500 font-semibold">{match.role}</p>
                  </div>
                  <span className="text-xs bg-pink-100 dark:bg-pink-900/30 text-pink-600 px-2 py-1 rounded-full">
                    {match.badge}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm text-[#B8A8C8] dark:text-gray-400 mb-3">
                  <FaStar className="text-yellow-400" /> {match.rating}
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {match.skills.map((skill, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-pink-50 dark:bg-gray-700/50 text-[#8B7A9B] dark:text-gray-300 text-xs rounded-full border border-pink-100">
                      {skill}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-[#8B7A9B] dark:text-gray-400 mb-3">{match.bio}</p>
                <button className="w-full bg-gradient-to-r from-pink-400 to-purple-400 text-white px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition">
                  Say Hi 💗
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ===== STUDY ROOMS ===== */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold text-[#5A4A6A] dark:text-white">Active Study Rooms</h2>
            <button className="text-sm text-pink-400 hover:text-pink-500">See all</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {rooms.map((room, i) => (
              <div key={i} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-4 border-2 border-[#FFD6E7] dark:border-gray-700 shadow-md text-center">
                <h3 className="font-semibold text-[#5A4A6A] dark:text-white">{room.name}</h3>
                <p className="text-sm text-[#B8A8C8] dark:text-gray-400 flex items-center justify-center gap-1 mt-1">
                  <MdPeople /> {room.members} members
                </p>
                <button className="mt-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white px-6 py-1.5 rounded-full text-sm font-semibold hover:shadow-lg transition">
                  Join
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ===== COMMUNITY FEED ===== */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-[#5A4A6A] dark:text-white mb-3">Community Feed</h2>
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-5 border-2 border-[#FFD6E7] dark:border-gray-700 shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-200 to-purple-200 flex items-center justify-center text-white font-bold">
                K
              </div>
              <div>
                <p className="font-semibold text-[#5A4A6A] dark:text-white">Krishna</p>
                <p className="text-xs text-[#B8A8C8] dark:text-gray-400">2h ago</p>
              </div>
            </div>
            <p className="text-[#5A4A6A] dark:text-white text-sm">💬 Looking for a Python partner to work on ML project 🚀</p>
            <p className="text-sm text-[#8B7A9B] dark:text-gray-300 mt-1">Let's build something cool together!</p>
            <div className="flex items-center gap-4 mt-3 text-sm text-[#B8A8C8] dark:text-gray-400">
              <span className="flex items-center gap-1">❤️ 28</span>
              <span className="flex items-center gap-1">💬 12</span>
              <span className="text-pink-400">#MachineLearning</span>
            </div>
          </div>
        </div>

        {/* ===== BOTTOM NAV ===== */}
        <div className="fixed bottom-4 left-0 right-0 mx-auto max-w-md bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-2 border-[#FFD6E7] dark:border-gray-700 px-5 py-2.5 rounded-3xl shadow-2xl flex justify-around items-center">
          <button className="text-pink-400 text-xl"><FaHeart /></button>
          <button className="text-[#B8A8C8] dark:text-gray-500 text-xl hover:text-pink-400 transition"><FaSearch /></button>
          <button className="text-[#B8A8C8] dark:text-gray-500 text-xl hover:text-pink-400 transition relative">
            <FaComments />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-pink-400 rounded-full text-[8px] text-white flex items-center justify-center">5</span>
          </button>
          <button className="text-[#B8A8C8] dark:text-gray-500 text-xl hover:text-pink-400 transition"><FaBookOpen /></button>
          <Link to="/profile" className="text-[#B8A8C8] dark:text-gray-500 text-xl hover:text-pink-400 transition"><FaUserFriends /></Link>
        </div>

        <div className="h-20"></div>

      </div>
    </div>
  )
}

export default Landing/ /   F o r c e   r e b u i l d  
 