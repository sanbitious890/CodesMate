import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MochiSVG from './MochiSVG'

const MochiAI = ({ onChatOpen, isTyping = false, isHoveringButton = false, isInputFocused = false }) => {
  const [position, setPosition] = useState({ x: window.innerWidth - 120, y: window.innerHeight - 140 })
  const [state, setState] = useState('idle')
  const [expression, setExpression] = useState('happy')
  const [isSleeping, setIsSleeping] = useState(false)
  const [tailWag, setTailWag] = useState(0)
  const [blink, setBlink] = useState(false)
  const idleTimer = useRef(null)

  useEffect(() => {
    const tailInterval = setInterval(() => setTailWag(prev => (prev + 8) % 360), 50)
    const blinkInterval = setInterval(() => {
      setBlink(true)
      setTimeout(() => setBlink(false), 150)
    }, 3000 + Math.random() * 2000)
    return () => {
      clearInterval(tailInterval)
      clearInterval(blinkInterval)
    }
  }, [])

  useEffect(() => {
    if (state === 'idle' && !isSleeping) {
      idleTimer.current = setTimeout(() => {
        setIsSleeping(true)
        setState('sleep')
        setExpression('sleepy')
      }, 20000)
    } else {
      clearTimeout(idleTimer.current)
    }
    return () => clearTimeout(idleTimer.current)
  }, [state, isSleeping])

  useEffect(() => {
    if (isHoveringButton && !isSleeping) {
      setState('jump')
      setExpression('excited')
      setTimeout(() => setState('idle'), 800)
    }
  }, [isHoveringButton, isSleeping])

  useEffect(() => {
    if (isInputFocused && !isSleeping) setExpression('curious')
  }, [isInputFocused, isSleeping])

  return (
    <motion.div
      className="fixed z-50 cursor-pointer select-none"
      style={{ width: '80px', height: '80px', pointerEvents: 'auto' }}
      animate={{ x: position.x, y: position.y, scale: isSleeping ? 0.85 : 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20, mass: 0.6 }}
      whileHover={{ scale: 1.1 }}
      onClick={onChatOpen}
    >
      <MochiSVG state={state} expression={expression} isSleeping={isSleeping} isTyping={isTyping} tailWag={tailWag} blink={blink} />
      <div className="absolute -top-9 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-purple-600 border border-pink-200 shadow-lg whitespace-nowrap flex items-center gap-1.5">
        ✨ Mochi <span className="inline-block w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse" />
      </div>
      <AnimatePresence>
        {isSleeping && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-xs text-purple-500 bg-white/80 px-2 py-0.5 rounded-full">
            💤 Zzz...
          </motion.div>
        )}
      </AnimatePresence>
      {isTyping && (
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-purple-400 bg-white/80 px-2 py-0.5 rounded-full">
          ✍️ thinking...
        </div>
      )}
    </motion.div>
  )
}

export default MochiAI