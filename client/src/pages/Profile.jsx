import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

const Profile = () => {
  const { user, updateUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    github: user?.github || '',
    skills: user?.skills || [],
  })
  const [skillInput, setSkillInput] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()],
      })
      setSkillInput('')
    }
  }

  const removeSkill = (skill) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await updateUser(formData)
    setLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Your Profile
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center mb-6">
          <img
            src={user?.profilePic || 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg'}
            alt={user?.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-primary-500"
          />
        </div>

        <div>
          <label className="label-text">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="label-text">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="input-field min-h-[100px]"
            placeholder="Tell us about yourself..."
          />
        </div>

        <div>
          <label className="label-text">GitHub URL</label>
          <input
            type="url"
            name="github"
            value={formData.github}
            onChange={handleChange}
            className="input-field"
            placeholder="https://github.com/yourusername"
          />
        </div>

        <div>
          <label className="label-text">Skills</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              className="input-field flex-1"
              placeholder="Add a skill..."
              onKeyPress={(e) => e.key === 'Enter' && addSkill()}
            />
            <button
              type="button"
              onClick={addSkill}
              className="px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {formData.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm flex items-center gap-2"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="hover:text-red-600"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}

export default Profile