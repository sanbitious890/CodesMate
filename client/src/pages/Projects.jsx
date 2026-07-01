import React, { useState } from 'react'
import { FaHeart, FaSearch, FaPlus, FaCode, FaUsers } from 'react-icons/fa'

const Projects = () => {
  const [search, setSearch] = useState('')
  
  const projects = [
    { title: 'AI Chat App', description: 'Real-time chat with AI', tech: ['React', 'Firebase'], members: 4, status: 'Active' },
    { title: 'Portfolio Website', description: 'Personal portfolio with animations', tech: ['Next.js', 'Tailwind'], members: 2, status: 'Completed' },
    { title: 'E-commerce Platform', description: 'Full-stack e-commerce', tech: ['Node.js', 'MongoDB'], members: 6, status: 'Active' },
    { title: 'Mobile App', description: 'React Native app for students', tech: ['React Native', 'Firebase'], members: 3, status: 'Planning' },
  ]

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.tech.some(t => t.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#2D1B3D] flex items-center gap-2">
          Projects <FaHeart className="text-pink-400" />
        </h1>
        <button className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:shadow-lg transition">
          <FaPlus /> New Project
        </button>
      </div>

      <div className="relative mb-6">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects..."
          className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-pink-200/50 focus:border-pink-400 outline-none transition bg-white/40 text-purple-800 placeholder-purple-300"
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map((project, i) => (
          <div key={i} className="bg-white/40 backdrop-blur-lg rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition">
            <h3 className="font-bold text-[#2D1B3D]">{project.title}</h3>
            <p className="text-sm text-purple-500 mt-1">{project.description}</p>
            <div className="flex flex-wrap gap-1 mt-3">
              {project.tech.map((tech, idx) => (
                <span key={idx} className="px-2 py-0.5 bg-pink-50 text-pink-600 text-xs rounded-full border border-pink-200">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex justify-between items-center mt-3 text-sm text-purple-500">
              <span className="flex items-center gap-1"><FaUsers /> {project.members}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                project.status === 'Active' ? 'bg-green-100 text-green-600' :
                project.status === 'Completed' ? 'bg-blue-100 text-blue-600' :
                'bg-yellow-100 text-yellow-600'
              }`}>
                {project.status}
              </span>
            </div>
            <button className="w-full mt-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white py-2 rounded-full text-sm font-medium hover:shadow-lg transition">
              View Project
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Projects