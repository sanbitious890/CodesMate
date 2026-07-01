import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import MochiAI from './MochiAI'
import AIChat from './AIChat'
import { useAuth } from '../context/AuthContext'

const Layout = () => {
  const [showChat, setShowChat] = useState(false)
  const [isHoveringButton, setIsHoveringButton] = useState(false)
  const [isInputFocused, setIsInputFocused] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F7] via-[#FFE8EE] to-[#F8F0FF] flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <div className="p-6">
          <Outlet context={{ setIsHoveringButton, setIsInputFocused }} />
        </div>
      </div>
      <MochiAI
        onChatOpen={() => setShowChat(!showChat)}
        isHoveringButton={isHoveringButton}
        isInputFocused={isInputFocused}
      />
      <AIChat isOpen={showChat} onClose={() => setShowChat(false)} />
    </div>
  )
}

export default Layout