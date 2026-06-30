import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

const API_URL = 'https://codesmate-backend.onrender.com/api'

const Dashboard = () => {
  const { user } = useAuth()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalProjects: 0,
    joinedProjects: 0,
    openProjects: 0,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/projects`)
        const allProjects = res.data
        
        const userProjects = allProjects.filter(p => 
          p.members?.some(m => m._id === user?._id)
        )
        
        setProjects(userProjects)
        setStats({
          totalProjects: allProjects.length,
          joinedProjects: userProjects.length,
          openProjects: allProjects.filter(p => p.status === 'open').length,
        })
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchData()
    }
  }, [user])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Here's what's happening with your projects
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Projects</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalProjects}</p>
            </div>
            <div className="text-3xl">📊</div>
          </div>
        </div>
        <div className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Your Projects</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.joinedProjects}</p>
            </div>
            <div className="text-3xl">👥</div>
          </div>
        </div>
        <div className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Open Projects</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.openProjects}</p>
            </div>
            <div className="text-3xl">🚀</div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <Link to="/projects/create" className="btn-primary inline-block">
          + Create New Project
        </Link>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your Projects</h2>
        {projects.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You haven't joined any projects yet
            </p>
            <Link to="/projects" className="btn-primary inline-block">
              Browse Projects
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project._id} className="glass-card p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>👥 {project.members?.length || 1}/{project.teamSize}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    project.status === 'open' ? 'bg-green-100 text-green-700' :
                    project.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {project.status || 'open'}
                  </span>
                </div>
                <Link
                  to={`/projects/${project._id}`}
                  className="mt-4 block text-center btn-primary text-sm py-2"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard