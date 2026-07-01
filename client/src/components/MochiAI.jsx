// client/src/components/MochiAI.jsx

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaHeart, FaStar, FaSparkles } from 'react-icons/fa'

const MochiAI = ({ 
  mousePosition, 
  onChatOpen, 
  showChat,
  onLoginSuccess,
  isTyping,
  isHoveringButton,
  isInputFocused
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [state, setState] = useState('idle')
  const [expression, setExpression] = useState('happy')
  const [isSleeping, setIsSleeping] = useState(false)
  const [particles, setParticles] = useState([])
  const [rotation, setRotation] = useState(0)
  const [sparkles, setSparkles] = useState([])
  const [tailWag, setTailWag] = useState(0)
  const [blink, setBlink] = useState(false)
  const [hearts, setHearts] = useState([])
  const [isHappy, setIsHappy] = useState(false)
  const idleTimer = useRef(null)
  const animationFrame = useRef(null)

  // Follow cursor smoothly
  useEffect(() => {
    const followCursor = () => {
      const targetX = mousePosition.x - 45
      const targetY = mousePosition.y - 60
      
      setPosition(prev => ({
        x: prev.x + (targetX - prev.x) * 0.06,
        y: prev.y + (targetY - prev.y) * 0.06,
      }))
      
      // Rotation based on movement
      const dx = targetX - position.x
      const dy = targetY - position.y
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        setRotation(prev => prev + (Math.atan2(dy, dx) * 0.1 - prev) * 0.05)
      }
      
      animationFrame.current = requestAnimationFrame(followCursor)
    }
    
    animationFrame.current = requestAnimationFrame(followCursor)
    return () => cancelAnimationFrame(animationFrame.current)
  }, [mousePosition, position])

  // Auto behaviors
  useEffect(() => {
    const behaviorInterval = setInterval(() => {
      // Random expressions
      const expressions = ['happy', 'excited', 'thinking', 'surprised', 'sleepy']
      const newExpression = expressions[Math.floor(Math.random() * expressions.length)]
      setExpression(newExpression)
      
      // Random states
      const states = ['idle', 'happy', 'wave', 'jump']
      const newState = states[Math.floor(Math.random() * states.length)]
      setState(newState)
      
      // Blink
      setBlink(true)
      setTimeout(() => setBlink(false), 150)
      
      // Tail wag
      setTailWag(prev => (prev + 1) % 360)
      
      // Generate sparkles
      if (state === 'happy' || state === 'excited') {
        const newSparkles = Array.from({ length: 3 }, () => ({
          x: Math.random() * 60 - 30,
          y: Math.random() * 60 - 30,
          size: Math.random() * 8 + 4,
          delay: Math.random() * 0.5,
        }))
        setSparkles(newSparkles)
      }
      
      // Auto sleep after 20 seconds idle
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
      
      setTimeout(() => {
        if (state !== 'sleep') setState('idle')
      }, 2000)
    }, 3000)
    
    return () => {
      clearInterval(behaviorInterval)
      if (idleTimer.current) clearTimeout(idleTimer.current)
    }
  }, [state, isSleeping])

  // React to external events
  useEffect(() => {
    if (isHoveringButton) {
      setState('jump')
      setExpression('excited')
      setTimeout(() => setState('idle'), 1000)
    }
  }, [isHoveringButton])

  useEffect(() => {
    if (isInputFocused) {
      setExpression('happy')
      setState('idle')
    }
  }, [isInputFocused])

  useEffect(() => {
    if (onLoginSuccess) {
      setIsHappy(true)
      setState('happy')
      setExpression('excited')
      // Heart particles
      const newHearts = Array.from({ length: 10 }, () => ({
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        delay: Math.random() * 0.5,
        size: Math.random() * 10 + 5,
      }))
      setHearts(newHearts)
      setTimeout(() => {
        setIsHappy(false)
        setState('idle')
        setHearts([])
      }, 3000)
    }
  }, [onLoginSuccess])

  // SVG Mochi Body
  const MochiBody = () => (
    <svg
      viewBox="0 0 120 120"
      className="w-full h-full"
      style={{ filter: 'drop-shadow(0 8px 32px rgba(236, 72, 153, 0.2))' }}
    >
      {/* Glow Effect */}
      <ellipse
        cx="60"
        cy="60"
        rx="65"
        ry="65"
        fill="url(#glow)"
        opacity="0.3"
        className="animate-pulse"
      />

      {/* Body - Fluffy Cloud Creature */}
      <motion.g
        animate={{
          scale: isSleeping ? 0.9 : 1,
          y: isSleeping ? 5 : 0,
        }}
        transition={{ duration: 0.8 }}
      >
        {/* Main Body */}
        <ellipse cx="60" cy="70" rx="35" ry="40" fill="#FFF5F7" />
        <ellipse cx="60" cy="70" rx="35" ry="40" fill="url(#bodyGradient)" />
        
        {/* Fluffy Fur Details */}
        <circle cx="35" cy="65" r="12" fill="#FFFFFF" opacity="0.8" />
        <circle cx="85" cy="65" r="12" fill="#FFFFFF" opacity="0.8" />
        <circle cx="45" cy="55" r="8" fill="#FFFFFF" opacity="0.6" />
        <circle cx="75" cy="55" r="8" fill="#FFFFFF" opacity="0.6" />
        <circle cx="60" cy="50" r="10" fill="#FFFFFF" opacity="0.5" />

        {/* Head */}
        <motion.g
          animate={{
            rotate: state === 'tilt' ? 15 : state === 'sleep' ? 10 : 0,
          }}
          transition={{ duration: 0.5 }}
        >
          <ellipse cx="60" cy="35" rx="30" ry="28" fill="#FFF5F7" />
          <ellipse cx="60" cy="35" rx="30" ry="28" fill="url(#headGradient)" />

          {/* Ears */}
          <motion.g
            animate={{
              rotate: state === 'happy' ? [0, 10, 0] : 0,
            }}
            transition={{ duration: 0.5, repeat: state === 'happy' ? Infinity : 0 }}
          >
            {/* Left Ear */}
            <ellipse cx="38" cy="15" rx="12" ry="16" fill="#FFF5F7" transform="rotate(-20 38 15)" />
            <ellipse cx="38" cy="15" rx="8" ry="12" fill="#FFD6E7" transform="rotate(-20 38 15)" opacity="0.5" />
            
            {/* Right Ear */}
            <ellipse cx="82" cy="15" rx="12" ry="16" fill="#FFF5F7" transform="rotate(20 82 15)" />
            <ellipse cx="82" cy="15" rx="8" ry="12" fill="#FFD6E7" transform="rotate(20 82 15)" opacity="0.5" />
          </motion.g>

          {/* Eyes */}
          <motion.g
            animate={{
              scaleX: blink ? 0.1 : 1,
              scaleY: blink ? 0.1 : 1,
            }}
            transition={{ duration: 0.15 }}
          >
            {/* Left Eye */}
            <ellipse cx="48" cy="32" rx="9" ry="10" fill="#FFFFFF" />
            <ellipse cx="48" cy="32" rx="6" ry="7" fill="#2D1B3D" />
            <circle cx="46" cy="30" r="3" fill="#FFFFFF" opacity="0.8" />
            <circle cx="51" cy="35" r="1.5" fill="#FFFFFF" opacity="0.4" />
            
            {/* Right Eye */}
            <ellipse cx="72" cy="32" rx="9" ry="10" fill="#FFFFFF" />
            <ellipse cx="72" cy="32" rx="6" ry="7" fill="#2D1B3D" />
            <circle cx="70" cy="30" r="3" fill="#FFFFFF" opacity="0.8" />
            <circle cx="75" cy="35" r="1.5" fill="#FFFFFF" opacity="0.4" />
          </motion.g>

          {/* Expression: Sleepy Eyes */}
          {expression === 'sleepy' && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <path d="M43 34 Q48 30 53 34" stroke="#2D1B3D" strokeWidth="2" fill="none" />
              <path d="M67 34 Q72 30 77 34" stroke="#2D1B3D" strokeWidth="2" fill="none" />
            </motion.g>
          )}

          {/* Expression: Happy Eyes */}
          {expression === 'happy' && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <path d="M43 38 Q48 42 53 38" stroke="#2D1B3D" strokeWidth="1.5" fill="none" />
              <path d="M67 38 Q72 42 77 38" stroke="#2D1B3D" strokeWidth="1.5" fill="none" />
            </motion.g>
          )}

          {/* Expression: Excited Eyes */}
          {expression === 'excited' && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <circle cx="48" cy="32" r="10" fill="#FFD6E7" opacity="0.3" />
              <circle cx="72" cy="32" r="10" fill="#FFD6E7" opacity="0.3" />
            </motion.g>
          )}

          {/* Expression: Thinking */}
          {expression === 'thinking' && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <path d="M43 38 Q48 35 53 38" stroke="#2D1B3D" strokeWidth="1.5" fill="none" />
              <path d="M67 38 Q72 35 77 38" stroke="#2D1B3D" strokeWidth="1.5" fill="none" />
              <circle cx="38" cy="20" r="4" fill="#FFD6E7" opacity="0.6" />
            </motion.g>
          )}

          {/* Blush Cheeks */}
          <motion.circle
            cx="38"
            cy="42"
            r="6"
            fill="#FFD6E7"
            opacity="0.4"
            animate={{
              scale: expression === 'happy' ? [1, 1.2, 1] : 1,
            }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
          <motion.circle
            cx="82"
            cy="42"
            r="6"
            fill="#FFD6E7"
            opacity="0.4"
            animate={{
              scale: expression === 'happy' ? [1, 1.2, 1] : 1,
            }}
            transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
          />

          {/* Tiny Nose */}
          <ellipse cx="60" cy="40" rx="4" ry="3" fill="#FF8FB1" />
          <ellipse cx="60" cy="39" rx="2" ry="1.5" fill="#FFFFFF" opacity="0.5" />

          {/* Mouth */}
          <motion.path
            d={
              expression === 'happy' ? 'M55 45 Q60 50 65 45' :
              expression === 'excited' ? 'M53 44 Q60 52 67 44' :
              expression === 'surprised' ? 'M55 44 Q60 50 65 44' :
              expression === 'thinking' ? 'M56 45 Q60 44 64 45' :
              'M55 46 Q60 48 65 46'
            }
            stroke="#2D1B3D"
            strokeWidth="1.5"
            fill="none"
          />

          {/* AI Heart Core on Chest */}
          <motion.g
            animate={{
              scale: isTyping ? [1, 1.3, 1] : 1,
            }}
            transition={{ duration: 0.5, repeat: isTyping ? Infinity : 0 }}
          >
            <circle cx="60" cy="72" r="12" fill="url(#heartGlow)" />
            <circle cx="60" cy="72" r="10" fill="#FFD6E7" />
            <FaHeart className="absolute text-pink-400" style={{ 
              fontSize: '14px',
              top: '66px',
              left: '53px',
              position: 'absolute',
            }} />
          </motion.g>
        </motion.g>

        {/* Tail */}
        <motion.g
          animate={{
            rotate: tailWag,
          }}
          transition={{ duration: 0.5 }}
        >
          <path d="M95 75 Q110 70 105 60" stroke="#FFF5F7" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M95 75 Q110 70 105 60" stroke="#FFD6E7" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.3" />
        </motion.g>

        {/* Tiny Paws */}
        <motion.g
          animate={{
            x: state === 'walk' ? [0, 3, 0, -3, 0] : 0,
          }}
          transition={{ duration: 0.5, repeat: state === 'walk' ? Infinity : 0 }}
        >
          <ellipse cx="45" cy="105" rx="6" ry="4" fill="#FFF5F7" />
          <ellipse cx="55" cy="105" rx="6" ry="4" fill="#FFF5F7" />
          <ellipse cx="65" cy="105" rx="6" ry="4" fill="#FFF5F7" />
          <ellipse cx="75" cy="105" rx="6" ry="4" fill="#FFF5F7" />
        </motion.g>
      </motion.g>

      {/* Glow/Halo */}
      <motion.circle
        cx="60"
        cy="35"
        r="45"
        fill="none"
        stroke="url(#haloGradient)"
        strokeWidth="2"
        opacity="0.3"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Sparkles */}
      {sparkles.map((sparkle, i) => (
        <motion.circle
          key={i}
          cx={sparkle.x + 60}
          cy={sparkle.y + 60}
          r={sparkle.size / 2}
          fill="#FFD6E7"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5, delay: sparkle.delay }}
        />
      ))}

      {/* Heart Particles on Login Success */}
      {hearts.map((heart, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: heart.x,
            y: heart.y,
          }}
          transition={{ duration: 1.5, delay: heart.delay }}
        >
          <FaHeart className="text-pink-400" style={{ fontSize: heart.size }} />
        </motion.g>
      ))}

      {/* Gradients */}
      <defs>
        <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#FFF5F7" />
          <stop offset="100%" stopColor="#FFE8EE" />
        </linearGradient>
        
        <linearGradient id="headGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#FFF5F7" />
          <stop offset="100%" stopColor="#FFE8EE" />
        </linearGradient>
        
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFD6E7" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FFD6E7" stopOpacity="0" />
        </radialGradient>
        
        <radialGradient id="heartGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF8FB1" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FF8FB1" stopOpacity="0" />
        </radialGradient>
        
        <linearGradient id="haloGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD6E7" />
          <stop offset="50%" stopColor="#D8B4FE" />
          <stop offset="100%" stopColor="#FFD6E7" />
        </linearGradient>
      </defs>
    </svg>
  )

  return (
    <motion.div
      className="fixed z-20 cursor-pointer select-none"
      style={{
        width: '80px',
        height: '80px',
        pointerEvents: 'auto',
      }}
      animate={{
        x: position.x,
        y: position.y,
        rotate: rotation,
        scale: isSleeping ? 0.9 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 60,
        damping: 25,
        mass: 0.6,
      }}
      whileHover={{ scale: 1.1 }}
      onClick={onChatOpen}
    >
      <MochiBody />
      
      {/* Name Tag */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-purple-600 border border-pink-200 shadow-lg whitespace-nowrap flex items-center gap-1.5"
      >
        ✨ Mochi
        <span className="inline-block w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse" />
      </motion.div>

      {/* Sleep Indicator */}
      <AnimatePresence>
        {isSleeping && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-xs text-purple-500 bg-white/80 px-2 py-0.5 rounded-full"
          >
            💤 Zzz...
          </motion.div>
        )}
      </AnimatePresence>

      {/* State Indicator */}
      <AnimatePresence>
        {state !== 'idle' && state !== 'sleep' && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-14 left-1/2 transform -translate-x-1/2 text-xs text-purple-500 bg-white/80 px-2 py-0.5 rounded-full"
          >
            {state === 'happy' ? '💗 Happy!' :
             state === 'excited' ? '🤩 Excited!' :
             state === 'jump' ? '⬆️ Jump!' :
             state === 'wave' ? '👋 Wave!' : ''}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Typing Indicator */}
      {isTyping && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-purple-400 bg-white/80 px-2 py-0.5 rounded-full"
        >
          ✍️ thinking...
        </motion.div>
      )}
    </motion.div>
  )
}

export default MochiAI