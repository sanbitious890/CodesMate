import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Landing = () => {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="text-center">
          <div className="inline-block px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white/80 text-sm mb-8">
            🚀 #1 Developer Collaboration Platform
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Find Your Perfect
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              {" "}Coding Partner
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto">
            Connect with developers, collaborate on projects, and build amazing things together.
            Join thousands of developers already finding their dream team on CodeMates.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Link to="/dashboard" className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:-translate-y-1">
                Go to Dashboard →
              </Link>
            ) : (
              <>
                <Link to="/register" className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:-translate-y-1">
                  Get Started Free
                </Link>
                <Link to="/projects" className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-full text-lg hover:bg-white/20 transition-all duration-300 hover:-translate-y-1">
                  Browse Projects
                </Link>
              </>
            )}
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-white/60">Active Developers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="text-4xl font-bold text-white mb-2">5K+</div>
              <div className="text-white/60">Projects Built</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-white/60">Success Rate</div>
            </div>
          </div>
        </div>

        <div className="mt-24 grid md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2">
            <div className="text-5xl mb-4">🤝</div>
            <h3 className="text-xl font-bold text-white mb-2">Find Teammates</h3>
            <p className="text-white/60">Connect with developers who have the skills you need</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2">
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="text-xl font-bold text-white mb-2">Build Projects</h3>
            <p className="text-white/60">Create and manage projects with your team</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2">
            <div className="text-5xl mb-4">💡</div>
            <h3 className="text-xl font-bold text-white mb-2">Learn & Grow</h3>
            <p className="text-white/60">Level up your skills by collaborating with others</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing