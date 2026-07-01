import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { FaUser, FaGraduationCap, FaCode, FaHeart, FaArrowRight, FaArrowLeft, FaCheck } from 'react-icons/fa'

const OnboardingPage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    college: '',
    course: '',
    year: '',
    country: '',
    skills: [],
    interests: [],
    bio: '',
  })
  const [selectedSkills, setSelectedSkills] = useState([])
  const [selectedInterests, setSelectedInterests] = useState([])

  const skills = ['JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js', 'MongoDB', 'Firebase', 'TypeScript', 'Go', 'Rust', 'Swift']
  const interests = ['Frontend', 'Backend', 'Full Stack', 'UI/UX', 'AI/ML', 'DevOps', 'Game Dev', 'Cyber Security', 'Blockchain']

  const handleNext = () => setStep(prev => prev + 1)
  const handlePrev = () => setStep(prev => prev - 1)

  const handleFinish = () => {
    // Save to Firebase/Firestore here
    navigate('/dashboard')
  }

  const toggleSkill = (skill) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    )
  }

  const toggleInterest = (interest) => {
    setSelectedInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    )
  }

  const steps = [
    {
      title: 'Welcome to Codesmate!',
      icon: FaHeart,
      content: (
        <div className="text-center">
          <p className="text-purple-600 text-lg mb-4">Let's set up your profile so you can find the perfect coding partners!</p>
          <p className="text-pink-500 text-sm">Mochi is here to guide you through this. 🐶</p>
        </div>
      )
    },
    {
      title: 'Tell us about yourself',
      icon: FaUser,
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-purple-700 text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 rounded-2xl border-2 border-pink-200/50 focus:border-pink-400 outline-none transition bg-white/40"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-purple-700 text-sm font-medium mb-1">College/University</label>
            <input
              type="text"
              value={formData.college}
              onChange={(e) => setFormData({...formData, college: e.target.value})}
              className="w-full px-4 py-3 rounded-2xl border-2 border-pink-200/50 focus:border-pink-400 outline-none transition bg-white/40"
              placeholder="Your college"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-purple-700 text-sm font-medium mb-1">Course</label>
              <input
                type="text"
                value={formData.course}
                onChange={(e) => setFormData({...formData, course: e.target.value})}
                className="w-full px-4 py-3 rounded-2xl border-2 border-pink-200/50 focus:border-pink-400 outline-none transition bg-white/40"
                placeholder="Course"
              />
            </div>
            <div>
              <label className="block text-purple-700 text-sm font-medium mb-1">Year</label>
              <select
                value={formData.year}
                onChange={(e) => setFormData({...formData, year: e.target.value})}
                className="w-full px-4 py-3 rounded-2xl border-2 border-pink-200/50 focus:border-pink-400 outline-none transition bg-white/40"
              >
                <option value="">Select year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
                <option value="grad">Graduate</option>
              </select>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'What are your skills?',
      icon: FaCode,
      content: (
        <div>
          <p className="text-purple-500 text-sm mb-4">Select the skills you have experience with</p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`px-4 py-2 rounded-full text-sm transition ${
                  selectedSkills.includes(skill)
                    ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg'
                    : 'bg-white/50 text-purple-600 border-2 border-pink-200/50 hover:bg-white/70'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      )
    },
    {
      title: 'What interests you?',
      icon: FaGraduationCap,
      content: (
        <div>
          <p className="text-purple-500 text-sm mb-4">Select your areas of interest</p>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`px-4 py-2 rounded-full text-sm transition ${
                  selectedInterests.includes(interest)
                    ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg'
                    : 'bg-white/50 text-purple-600 border-2 border-pink-200/50 hover:bg-white/70'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>
      )
    },
    {
      title: 'Almost there!',
      icon: FaCheck,
      content: (
        <div className="text-center">
          <p className="text-purple-600 text-lg mb-4">You're all set to start your coding journey!</p>
          <p className="text-pink-500 text-sm">Mochi will be with you every step of the way. 🐶</p>
          <div className="mt-6 p-4 bg-pink-50 rounded-2xl">
            <p className="text-purple-700">✨ You've joined the Codesmate community!</p>
            <p className="text-sm text-purple-500">Find your perfect coding partner and build amazing things.</p>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F7] via-[#FFE8EE] to-[#F8F0FF] flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
          className="bg-white/40 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/40"
        >
          {/* Progress */}
          <div className="flex justify-between mb-8">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition ${
                  i + 1 <= step ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white' : 'bg-white/50 text-purple-400'
                }`}>
                  {i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-2 transition ${i + 1 < step ? 'bg-pink-400' : 'bg-pink-200'}`} />
                )}
              </div>
            ))}
          </div>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center text-white`}>
              {React.createElement(steps[step - 1].icon)}
            </div>
            <h2 className="text-2xl font-bold text-[#2D1B3D]">{steps[step - 1].title}</h2>
          </div>

          {/* Content */}
          <div className="mb-8">
            {steps[step - 1].content}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={handlePrev}
              disabled={step === 1}
              className={`px-6 py-3 rounded-full font-medium transition flex items-center gap-2 ${
                step === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/50'
              }`}
            >
              <FaArrowLeft /> Back
            </button>
            {step < steps.length ? (
              <button
                onClick={handleNext}
                className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg hover:scale-105 transition flex items-center gap-2"
              >
                Next <FaArrowRight />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg hover:scale-105 transition flex items-center gap-2"
              >
                Let's Go! <FaCheck />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default OnboardingPage