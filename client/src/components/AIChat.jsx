import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const AIChat = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'ai', content: "Hi! I'm Mochi, your AI coding buddy. What shall we build today? 💗", timestamp: new Date() }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => scrollToBottom(), [messages])
  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })

  const getAIResponse = (msg) => {
    const m = msg.toLowerCase()
    if (m.includes('code')) return `Great! Here's some code for you:\n\`\`\`javascript\nfunction solution() {\n  // Your code\n}\n\`\`\`\nLet me know if you need more! 💗`
    if (m.includes('debug')) return `Let's debug together! 🔍\n1. Check the error\n2. Find the line\n3. Fix the issue\n4. Test it\n\nWhat error are you seeing?`
    if (m.includes('react')) return `React is amazing! ⚛️\n• useState for state\n• useEffect for side effects\n• Props for data passing\n\nWant me to explain any?`
    if (m.includes('project')) return `Building projects is the best way to learn! 🚀\n1. Plan\n2. Setup\n3. Build\n4. Deploy\n\nWhat kind of project are you building?`
    return `That's a great question! 🤔\nI can help with:\n• 💻 Coding\n• 🔍 Debugging\n• 📚 DSA\n• 🚀 Projects\n• 💗 Career\n\nWhat would you like to know?`
  }

  const handleSend = () => {
    if (!input.trim()) return
    const userMsg = { id: Date.now(), type: 'user', content: input, timestamp: new Date() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'ai', content: getAIResponse(input), timestamp: new Date() }])
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
          className="fixed bottom-28 right-8 w-[380px] max-h-[500px] bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border-2 border-pink-200/50 z-[100] flex flex-col overflow-hidden"
        >
          <div className="flex items-center justify-between p-4 border-b border-pink-100/50 bg-gradient-to-r from-pink-50 to-purple-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center text-xl">🐶</div>
              <div>
                <div className="font-semibold text-purple-700">💖 Mochi AI <span className="text-[10px] text-purple-400 font-normal">✨ 4.9</span></div>
                <div className="text-xs text-purple-400 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block animate-pulse" /> Online</div>
              </div>
            </div>
            <button onClick={onClose} className="text-purple-400 hover:text-purple-600 transition text-xl">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-56">
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
                <div className="bg-purple-50 text-purple-400 p-3 rounded-2xl rounded-bl-none"><span className="inline-flex gap-1"><span className="animate-bounce">•</span><span className="animate-bounce delay-100">•</span><span className="animate-bounce delay-200">•</span></span></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="px-4 py-2 flex gap-2 flex-wrap border-t border-pink-100/50">
            {['Explain Code', 'Debug Error', 'DSA Help', 'Project Ideas'].map((action) => (
              <button key={action} onClick={() => { setInput(action); setTimeout(handleSend, 100) }} className="text-xs px-3 py-1 rounded-full bg-pink-50 text-purple-600 hover:bg-pink-100 transition border border-pink-200">
                {action}
              </button>
            ))}
          </div>
          <div className="p-3 border-t border-pink-100/50 bg-white/50">
            <div className="flex gap-2">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="💭 Ask Mochi anything..." className="flex-1 px-4 py-2.5 rounded-full border-2 border-pink-200/50 focus:border-pink-400 outline-none transition bg-white/50 text-purple-700 text-sm placeholder-purple-300" />
              <button onClick={handleSend} disabled={!input.trim()} className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-4 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg transition disabled:opacity-50 flex-shrink-0">Send</button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AIChat