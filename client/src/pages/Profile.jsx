import React from 'react'
import { FaUser, FaHeart, FaCode, FaProjectDiagram, FaUsers } from 'react-icons/fa'

const Profile = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl p-8 mb-8 border border-pink-100 shadow-lg">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-4xl text-white">
            <FaUser />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#2D1B3D]">User Profile</h1>
            <p className="text-purple-500">Developer | Coder | Builder</p>
            <div className="flex gap-4 mt-2 text-sm text-purple-500">
              <span className="flex items-center gap-1"><FaCode /> 45 projects</span>
              <span className="flex items-center gap-1"><FaUsers /> 12 teammates</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/40 backdrop-blur-lg rounded-2xl p-6 border border-white/50 shadow-lg">
          <h2 className="font-bold text-[#2D1B3D] flex items-center gap-2">
            <FaHeart className="text-pink-400" /> Skills
          </h2>
          <div className="flex flex-wrap gap-2 mt-3">
            {['React', 'Node.js', 'JavaScript', 'Python', 'Tailwind', 'Firebase'].map((skill) => (
              <span key={skill} className="px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-sm border border-pink-200">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white/40 backdrop-blur-lg rounded-2xl p-6 border border-white/50 shadow-lg">
          <h2 className="font-bold text-[#2D1B3D] flex items-center gap-2">
            <FaProjectDiagram className="text-purple-400" /> Recent Projects
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-purple-600">
            <li>• AI Chat App</li>
            <li>• Portfolio Website</li>
            <li>• E-commerce Platform</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Profile