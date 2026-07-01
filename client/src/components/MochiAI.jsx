import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MochiSVG from './MochiSVG'

const MochiAI = ({
  mousePosition,
  onChatOpen,
  isTyping = false,
  isHoveringButton = false,
  isInputFocused = false,
  onLoginSuccess = false,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [state, setState] = useState('idle')
  const [expression, setExpression] = useState('happy')
  const [isSleeping, setIsSleeping] = useState(false)
  const [tailWag, setTailWag] = useState(0)
  const [blink, setBlink] = useState(false)
  const [particles, setParticles] = useState([])
  const idleTimer = useRef(null)
  const animationFrame = useRef(null)
  const prevMousePos = useRef({ x: 0, y: 0 })

  // Smooth LERP following
  useEffect(() => {
    const followCursor = () => {
      const targetX = mousePosition.x - 35
      const targetY = mousePosition.y - 70

      const dx = targetX - position.x
      const dy = targetY - position.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance > 100) setState('run')
      else if (distance > 20) setState('walk')
      else if (distance < 5 && state !== 'sleep') setState('idle')

      const speed = 0.12
      setPosition({
        x: position.x + dx * speed,
        y: position.y + dy * speed,
      })

      prevMousePos.current = mousePosition
      animationFrame.current = requestAnimationFrame(followCursor)
    }

    animationFrame.current = requestAnimationFrame(followCursor)
    return () => cancelAnimationFrame(animationFrame.current)
  }, [mousePosition, position, state])

  // Tail wag
  useEffect(() => {
    const tailInterval = setInterval(() => {
      setTailWag(prev => (prev + 8) % 360)
    }, 50)
    return () => clearInterval(tailInterval)
  }, [])

  // Blink
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true)
      setTimeout(() => setBlink(false), 150)
    }, 3000 + Math.random() * 2000)
    return () => clearInterval(blinkInterval)
  }, [])

  // Auto sleep after 20 seconds idle
  useEffect(() => {
    if (state === 'idle' && !isSleeping) {
      if (idleTimer.current) clearTimeout(idleTimer.current)
      idleTimer.current = setTimeout(() => {
        setIsSleeping(true)
        setState('sleep')
        setExpression('sleepy')
      }, 20000)
    } else {
      if (idleTimer.current) clearTimeout(idleTimer.current)
      idleTimer.current = null
    }
    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current)
    }
  }, [state, isSleeping])

  // Wake up on mouse move
  useEffect(() => {
    if (isSleeping && (Math.abs(mousePosition.x - prevMousePos.current.x) > 10 ||
                       Math.abs(mousePosition.y - prevMousePos.current.y) > 10)) {
      setIsSleeping(false)
      setState('idle')
      setExpression('happy')
    }
  }, [mousePosition, isSleeping])

  // React to button hover
  useEffect(() => {
    if (isHoveringButton && !isSleeping) {
      setState('jump')
      setExpression('excited')
      setTimeout(() => setState('idle'), 800)
    }
  }, [isHoveringButton, isSleeping])

  // React to input focus
  useEffect(() => {
    if (isInputFocused && !isSleeping) {
      setExpression('curious')
    }
  }, [isInputFocused, isSleeping])

  // React to typing
  useEffect(() => {
    if (isTyping && !isSleeping) {
      setExpression('excited')
    }
  }, [isTyping, isSleeping])

  // Login success animation
  useEffect(() => {
    if (onLoginSuccess) {
      setState('happy')
      setExpression('excited')
      const newParticles = Array.from({ length: 12 }, () => ({
        x: (Math.random() - 0.5) * 120,
        y: (Math.random() - 0.5) * 120 - 40,
        size: Math.random() * 8 + 4,
        delay: Math.random() * 0.5,
      }))
      setParticles(newParticles)
      setTimeout(() => {
        setState('idle')
        setExpression('happy')
        setParticles([])
      }, 3000)
    }
  }, [onLoginSuccess])

  // Random expressions
  useEffect(() => {
    if (state === 'idle' && !isSleeping) {
      const interval = setInterval(() => {
        const expressions = ['happy', 'thinking', 'curious', 'proud']
        setExpression(expressions[Math.floor(Math.random() * expressions.length)])
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [state, isSleeping])

  return (
    <motion.div
      className="fixed z-20 cursor-pointer select-none"
      style={{ width: '90px', height: '90px', pointerEvents: 'auto' }}
      animate={{
        x: position.x,
        y: position.y,
        scale: isSleeping ? 0.85 : 1,
      }}
      transition={{ type: 'spring', stiffness: 120, damping: 20, mass: 0.6 }}
      whileHover={{ scale: 1.08 }}
      onClick={onChatOpen}
    >
      <MochiSVG
        state={state}
        expression={expression}
        isSleeping={isSleeping}
        isTyping={isTyping}
        tailWag={tailWag}
        blink={blink}
      />

      {/* Name Tag */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute -top-9 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-purple-600 border border-pink-200 shadow-lg whitespace-nowrap flex items-center gap-1.5"
      >
        ✨ Mochi
        <span className="inline-block w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse" />
      </motion.div>

      {/* Sleep Indicator */}
      <AnimatePresence>
        {isSleeping && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-xs text-purple-500 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full"
          >
            💤 Zzz...
          </motion.div>
        )}
      </AnimatePresence>

      {/* State Indicator */}
      <AnimatePresence>
        {state !== 'idle' && state !== 'sleep' && !isSleeping && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -top-14 left-1/2 transform -translate-x-1/2 text-xs text-purple-500 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full whitespace-nowrap"
          >
            {state === 'walk' ? '🚶 Walking...' :
             state === 'run' ? '🏃 Running!' :
             state === 'jump' ? '⬆️ Jump!' :
             state === 'happy' ? '💗 Happy!' : ''}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Typing Indicator */}
      {isTyping && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-purple-400 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full"
        >
          ✍️ thinking...
        </motion.div>
      )}
    </motion.div>
  )
}

export default MochiAI