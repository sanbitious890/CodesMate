import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const CreateProject = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: [],
    teamSize: 1,
  })
  const [techInput, setTechInput] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const addTech = () => {
    if (techInput.trim() && !formData.techStack.includes(techInput.trim())) {
      setFormData({
        ...formData,
        techStack: [...formData.techStack, techInput.trim()],
      })
      setTechInput('')
    }
  }

  const removeTech = (tech) => {
    setFormData({
      ...formData,
      techStack: formData.techStack.filter((t) => t !== tech),
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post('http://localhost:5000/api/projects', formData)
      toast.success('Project created successfully! 🎉')
      navigate('/projects')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create project')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Create New Project
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="label-text">Project Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input-field"
            placeholder="e.g., E-commerce Platform"
            required
          />
        </div>

        <div>
          <label className="label-text">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="input-field min-h-[120px]"
            placeholder="Describe your project..."
            required
          />
        </div>

        <div>
          <label className="label-text">Tech Stack</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              className="input-field flex-1"
              placeholder="e.g., React, Node.js"
              onKeyPress={(e) => e.key === 'Enter' && addTech()}
            />
            <button
              type="button"
              onClick={addTech}
              className="px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {formData.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm flex items-center gap-2"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => removeTech(tech)}
                  className="hover:text-red-600"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="label-text">Team Size</label>
          <input
            type="number"
            name="teamSize"
            value={formData.teamSize}
            onChange={handleChange}
            className="input-field"
            min="1"
            max="20"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating...' : 'Create Project'}
        </button>
      </form>
    </div>
  )
}

export default CreateProject