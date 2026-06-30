import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

const API_URL = 'https://codesmate-backend.onrender.com/api'

const ProjectDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [joining, setJoining] = useState(false)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`${API_URL}/projects/${id}`)
        setProject(res.data)
      } catch (error) {
        toast.error('Project not found')
        navigate('/projects')
      } finally {
        setLoading(false)
      }
    }
    fetchProject()
  }, [id, navigate])

  const handleJoin = async () => {
    if (!user) {
      toast.error('Please login to join this project')
      navigate('/login')
      return
    }

    setJoining(true)
    try {
      const res = await axios.post(`${API_URL}/projects/${id}/join`)
      setProject(res.data)
      toast.success('Joined project successfully! 🎉')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to join project')
    } finally {
      setJoining(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this project?')) return

    try {
      await axios.delete(`${API_URL}/projects/${id}`)
      toast.success('Project deleted')
      navigate('/projects')
    } catch (error) {
      toast.error('Failed to delete project')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    )
  }

  if (!project) return null

  const isMember = project.members?.some((m) => m._id === user?._id)
  const isCreator = project.creator?._id === user?._id
  const isFull = project.members?.length >= project.teamSize

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="glass-card p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {project.title}
        </h1>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack?.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-6 whitespace-pre-wrap">
          {project.description}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <p className="text-sm text-gray-500 dark:text-gray-400">Team Size</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              {project.members?.length || 1}/{project.teamSize}
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
            <p className={`text-xl font-bold ${
              project.status === 'open' ? 'text-green-600' :
              project.status === 'in-progress' ? 'text-yellow-600' :
              'text-gray-600'
            }`}>
              {project.status || 'open'}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Created by
          </h3>
          <div className="flex items-center gap-3">
            <img
              src={project.creator?.profilePic || 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg'}
              alt={project.creator?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-gray-700 dark:text-gray-300">
              {project.creator?.name}
            </span>
          </div>
        </div>

        {project.members?.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Team Members ({project.members.length})
            </h3>
            <div className="flex flex-wrap gap-3">
              {project.members.map((member) => (
                <div key={member._id} className="flex items-center gap-2">
                  <img
                    src={member.profilePic || 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg'}
                    alt={member.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {member.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-4">
          {!isMember && project.status === 'open' && !isFull && (
            <button
              onClick={handleJoin}
              disabled={joining}
              className="btn-primary disabled:opacity-50"
            >
              {joining ? 'Joining...' : 'Join Project'}
            </button>
          )}
          {isMember && (
            <span className="px-6 py-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-xl font-semibold">
              ✅ Member
            </span>
          )}
          {isFull && !isMember && (
            <span className="px-6 py-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-xl font-semibold">
              Team is Full
            </span>
          )}
          {isCreator && (
            <button
              onClick={handleDelete}
              className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
            >
              Delete Project
            </button>
          )}
          <button
            onClick={() => navigate('/projects')}
            className="btn-secondary"
          >
            Back to Projects
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail