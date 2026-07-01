import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FaHeart, FaCode, FaPaintBrush, FaDatabase, FaCloud, FaMobile, FaGamepad, FaRobot } from 'react-icons/fa'

const RegisterWithInterests = () => {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    interests: [],
    bio: '',
  })
  const [selectedInterests, setSelectedInterests] = useState([])

  const interests = [
    { name: 'Web Development', icon: <FaCode />, color: 'from-blue-400 to-blue-600' },
    { name: 'UI/UX Design', icon: <FaPaintBrush />, color: 'from-pink-400 to-pink-600' },
    { name: 'Database', icon: <FaDatabase />, color: 'from-green-400 to-green-600' },
    { name: 'Cloud Computing', icon: <FaCloud />, color: 'from-cyan-400 to-cyan-600' },
    { name: 'Mobile Development', icon: <FaMobile />, color: 'from-purple-400 to-purple-600' },
    { name: 'Game Development', icon: <FaGamepad />, color: 'from-orange-400 to-orange-600' },
    { name: 'AI/ML', icon: <FaRobot />, color: 'from-red-400 to-red-600' },
    { name: 'Open Source', icon: <FaHeart />, color: 'from-yellow-400 to-yellow-600' },
  ]

  const toggleInterest = (interest) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const userData = {
      ...formData,
      skills: selectedInterests,
    }
    const result = await register(userData)
    setLoading(false)
    if (result.success) {
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 p-4 flex items-center justify-center">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
        
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-purple-800">🌸 Create Account</h1>
          <p className="text-purple-600">Choose your interests to find the perfect match!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-purple-700 font-medium mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 rounded-xl border-2 border-pink-200 focus:border-pink-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-purple-700 font-medium mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-2 rounded-xl border-2 border-pink-200 focus:border-pink-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-purple-700 font-medium mb-1">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-2 rounded-xl border-2 border-pink-200 focus:border-pink-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-purple-700 font-medium mb-2">Select Your Interests</label>
            <div className="grid grid-cols-2 gap-2">
              {interests.map((interest) => (
                <button
                  key={interest.name}
                  type="button"
                  onClick={() => toggleInterest(interest.name)}
                  className={`p-3 rounded-xl flex items-center gap-2 text-sm transition ${
                    selectedInterests.includes(interest.name)
                      ? `bg-gradient-to-r ${interest.color} text-white shadow-lg scale-105`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {interest.icon}
                  {interest.name}
                </button>
              ))}
            </div>
            <p className="text-xs text-purple-500 mt-1">Selected: {selectedInterests.length} interests</p>
          </div>

          <div>
            <label className="block text-purple-700 font-medium mb-1">Bio (optional)</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              className="w-full px-4 py-2 rounded-xl border-2 border-pink-200 focus:border-pink-400 outline-none"
              rows="2"
              placeholder="Tell us a bit about yourself..."
            />
          </div>

          <button
            type="submit"
            disabled={loading || selectedInterests.length === 0}
            className="w-full bg-gradient-to-r from-pink-400 to-purple-400 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition disabled:opacity-50"
          >
            {loading ? 'Creating...' : '💗 Create Account & Find Your Match'}
          </button>
        </form>

        <p className="text-center text-purple-500 text-sm mt-4">
          Already have an account? <Link to="/login" className="text-pink-500 font-semibold">Sign In</Link>
        </p>

      </div>
    </div>
  )
}

export default RegisterWithInterests