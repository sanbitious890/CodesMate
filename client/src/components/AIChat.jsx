import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const AIChat = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hi!! I'm Mochi.\nYour AI coding buddy.\nWhat shall we build today?",
      timestamp: new Date(),
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  const getAIResponse = (msg) => {
    const m = msg.toLowerCase()
    if (m.includes('code') || m.includes('how to')) {
      return `Great question! Let me help you with that! 💻\n\nHere's a simple example:\n\n\`\`\`javascript\n// Your code here\nfunction solution() {\n  // Implementation\n}\n\`\`\`\n\nLet me know if you need more details! 💗`
    }
    if (m.includes('debug') || m.includes('error') || m.includes('bug')) {
      return `Don't worry! Let's debug together! 🔍\n\nHere's my approach:\n1. Check the error message\n2. Look at the line number\n3. Identify the root cause\n4. Implement the fix\n\nWhat's the error you're seeing? 💗`
    }
    if (m.includes('dsa') || m.includes('algorithm')) {
      return `Great choice! Let's tackle DSA! 📚\n\nHere's a common approach:\n1. Understand the problem\n2. Brute force solution\n3. Optimize step by step\n4. Analyze complexity\n\nWhich topic are you working on? 💗`
    }
    if (m.includes('project') || m.includes('build')) {
      return `Building projects is the best way to learn! 🚀\n\nHere's a step-by-step approach:\n1. Plan your project\n2. Set up the environment\n3. Build the core features\n4. Add polish and deploy\n\nWhat kind of project are you building? 💗`
    }
    if (m.includes('react')) {
      return `React is amazing! Let me break it down: ⚛️\n\n• useState: Manage component state\n• useEffect: Handle side effects\n• Props: Pass data between components\n• Context: Share data globally\n\nWant me to explain any of these? 💗`
    }
    if (m.includes('hello') || m.includes('hi')) {
      return `Hey there! 👋 So excited to code with you!\n\nWhat are we building today? I'm ready to help! 💻💗`
    }
    return `That's a great question! 🤔\n\nI can help with:\n• 💻 Coding questions\n• 🔍 Debugging\n• 📚 DSA practice\n• 🚀 Project ideas\n• 💗 Career advice\n\nWhat would you like to know more about?`
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMsg = { id: Date.now(), type: 'user', content: input, timestamp: new Date() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const response = getAIResponse(input)
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'ai', content: response, timestamp: new Date() }])
      setIsTyping(false)
    }, 1000 + Math.random() * 1500)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="fixed bottom-28 right-8 w-[360px] max-h-[500px] bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border-2 border-pink-200/50 z-30 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-pink-100/50 bg-gradient-to-r from-pink-50 to-purple-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center text-xl shadow-md">🐶</div>
              <div>
                <div className="font-semibold text-purple-700">💖 Mochi AI <span className="text-[10px] text-purple-400 font-normal">✨ 4.9</span></div>
                <div className="text-xs text-purple-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block animate-pulse" />
                  Online • Coding Buddy
                </div>
              </div>
            </div>
            <button onClick={onClose} className="text-purple-400 hover:text-purple-600 transition text-xl">✕</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-64">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl ${msg.type === 'user' ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-br-none' : 'bg-purple-50 text-purple-700 rounded-bl-none'}`}>
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  <span className="text-[10px] opacity-50 mt-1 block">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-purple-50 text-purple-400 p-3 rounded-2xl rounded-bl-none">
                  <span className="inline-flex gap-1"><span className="animate-bounce">•</span><span className="animate-bounce delay-100">•</span><span className="animate-bounce delay-200">•</span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="px-4 py-2 flex gap-2 flex-wrap border-t border-pink-100/50">
            {['Explain Code', 'Debug Error', 'DSA Help', 'Project Ideas'].map((action) => (
              <button key={action} onClick={() => { setInput(action); setTimeout(handleSend, 100) }} className="text-xs px-3 py-1 rounded-full bg-pink-50 text-purple-600 hover:bg-pink-100 transition border border-pink-200">
                {action}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-pink-100/50 bg-white/50">
            <div className="flex gap-2">
              <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="💭 Ask Mochi anything..." className="flex-1 px-4 py-2.5 rounded-full border-2 border-pink-200/50 focus:border-pink-400 outline-none transition bg-white/50 text-purple-700 text-sm placeholder-purple-300" />
              <button onClick={handleSend} disabled={!input.trim()} className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-4 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg transition disabled:opacity-50 flex-shrink-0">Send</button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AIChat