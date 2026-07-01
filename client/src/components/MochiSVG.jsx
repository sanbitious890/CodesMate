import React from 'react'
import { motion } from 'framer-motion'

const MochiSVG = ({ 
  state = 'idle', 
  expression = 'happy', 
  isSleeping = false,
  isTyping = false,
  tailWag = 0,
  blink = false,
}) => {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-full h-full"
      style={{
        filter: 'drop-shadow(0 8px 32px rgba(236, 72, 153, 0.15))',
      }}
    >
      <defs>
        <radialGradient id="fur" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#FFF5F7" />
          <stop offset="100%" stopColor="#FFE8EE" />
        </radialGradient>
        <radialGradient id="ear" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFD6E7" />
          <stop offset="100%" stopColor="#FFB6C1" />
        </radialGradient>
        <radialGradient id="blush" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFB6C1" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FFB6C1" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF8FB1" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FF8FB1" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="halo" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD6E7" />
          <stop offset="50%" stopColor="#D8B4FE" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
        <filter id="glowFilter">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <motion.g
        animate={{
          scale: isSleeping ? 0.9 : 1,
          y: isSleeping ? 5 : 0,
        }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        {/* BODY */}
        <ellipse cx="100" cy="120" rx="55" ry="60" fill="url(#fur)" />
        <circle cx="70" cy="110" r="18" fill="#FFFFFF" opacity="0.8" />
        <circle cx="130" cy="110" r="18" fill="#FFFFFF" opacity="0.8" />
        <ellipse cx="100" cy="130" rx="35" ry="30" fill="#FFFFFF" opacity="0.7" />

        {/* TAIL */}
        <motion.g
          animate={{ rotate: tailWag }}
          transition={{ duration: 0.3 }}
        >
          <path d="M155 115 Q175 105 170 85 Q165 75 160 80" stroke="#FFF5F7" strokeWidth="12" fill="none" strokeLinecap="round" />
          <path d="M155 115 Q175 105 170 85 Q165 75 160 80" stroke="#FFD6E7" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.3" />
        </motion.g>

        {/* HEAD */}
        <motion.g
          animate={{ rotate: state === 'tilt' ? 8 : state === 'confused' ? -5 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <ellipse cx="100" cy="65" rx="48" ry="44" fill="url(#fur)" />

          {/* EARS */}
          <motion.g
            animate={{ rotate: state === 'happy' ? [0, 8, 0] : 0 }}
            transition={{ duration: 0.5, repeat: state === 'happy' ? Infinity : 0 }}
          >
            <g transform="translate(55, 30)">
              <ellipse cx="0" cy="0" rx="16" ry="22" fill="url(#fur)" transform="rotate(-25)" />
              <ellipse cx="0" cy="0" rx="10" ry="16" fill="url(#ear)" transform="rotate(-25)" opacity="0.7" />
            </g>
            <g transform="translate(145, 30)">
              <ellipse cx="0" cy="0" rx="16" ry="22" fill="url(#fur)" transform="rotate(25)" />
              <ellipse cx="0" cy="0" rx="10" ry="16" fill="url(#ear)" transform="rotate(25)" opacity="0.7" />
            </g>
          </motion.g>

          {/* HALO */}
          <motion.circle
            cx="100"
            cy="30"
            r="55"
            fill="none"
            stroke="url(#halo)"
            strokeWidth="2"
            opacity="0.3"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />

          {/* EYES */}
          <motion.g
            animate={{
              scaleX: blink ? 0.1 : 1,
              scaleY: blink ? 0.1 : 1,
            }}
            transition={{ duration: 0.15 }}
          >
            {/* Happy Eyes */}
            {expression === 'happy' && (
              <>
                <path d="M70 64 Q78 58 86 64" stroke="#2D1B3D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M114 64 Q122 58 130 64" stroke="#2D1B3D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </>
            )}

            {/* Thinking Eyes */}
            {expression === 'thinking' && (
              <>
                <circle cx="78" cy="52" r="6" fill="#2D1B3D" />
                <circle cx="122" cy="52" r="6" fill="#2D1B3D" />
                <circle cx="76" cy="50" r="2" fill="#FFFFFF" opacity="0.7" />
                <circle cx="120" cy="50" r="2" fill="#FFFFFF" opacity="0.7" />
              </>
            )}

            {/* Sleepy Eyes */}
            {expression === 'sleepy' && (
              <>
                <path d="M68 64 Q78 58 88 64" stroke="#2D1B3D" strokeWidth="2" fill="none" />
                <path d="M112 64 Q122 58 132 64" stroke="#2D1B3D" strokeWidth="2" fill="none" />
              </>
            )}

            {/* Excited Eyes */}
            {expression === 'excited' && (
              <>
                <ellipse cx="78" cy="60" rx="16" ry="18" fill="#FFFFFF" />
                <ellipse cx="78" cy="60" rx="10" ry="12" fill="#2D1B3D" />
                <circle cx="74" cy="55" r="5" fill="#FFFFFF" opacity="0.9" />
                <ellipse cx="122" cy="60" rx="16" ry="18" fill="#FFFFFF" />
                <ellipse cx="122" cy="60" rx="10" ry="12" fill="#2D1B3D" />
                <circle cx="118" cy="55" r="5" fill="#FFFFFF" opacity="0.9" />
              </>
            )}

            {/* Confused Eyes */}
            {expression === 'confused' && (
              <>
                <ellipse cx="78" cy="60" rx="10" ry="12" fill="#2D1B3D" />
                <ellipse cx="122" cy="60" rx="10" ry="12" fill="#2D1B3D" />
                <circle cx="76" cy="58" r="3" fill="#FFFFFF" opacity="0.7" />
                <circle cx="120" cy="58" r="3" fill="#FFFFFF" opacity="0.7" />
              </>
            )}

            {/* Surprised Eyes */}
            {expression === 'surprised' && (
              <>
                <ellipse cx="78" cy="58" rx="14" ry="16" fill="#FFFFFF" />
                <ellipse cx="78" cy="58" rx="8" ry="10" fill="#2D1B3D" />
                <circle cx="76" cy="55" r="4" fill="#FFFFFF" opacity="0.9" />
                <ellipse cx="122" cy="58" rx="14" ry="16" fill="#FFFFFF" />
                <ellipse cx="122" cy="58" rx="8" ry="10" fill="#2D1B3D" />
                <circle cx="120" cy="55" r="4" fill="#FFFFFF" opacity="0.9" />
              </>
            )}

            {/* Proud Eyes */}
            {expression === 'proud' && (
              <>
                <path d="M72 64 Q78 60 84 64" stroke="#2D1B3D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M116 64 Q122 60 128 64" stroke="#2D1B3D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </>
            )}
          </motion.g>

          {/* BLUSH */}
          <motion.circle
            cx="62"
            cy="74"
            r="10"
            fill="url(#blush)"
            animate={{
              opacity: expression === 'happy' || expression === 'excited' ? 0.8 : 0.4,
              scale: expression === 'happy' ? [1, 1.2, 1] : 1,
            }}
            transition={{ duration: 0.8, repeat: expression === 'happy' ? Infinity : 0 }}
          />
          <motion.circle
            cx="138"
            cy="74"
            r="10"
            fill="url(#blush)"
            animate={{
              opacity: expression === 'happy' || expression === 'excited' ? 0.8 : 0.4,
              scale: expression === 'happy' ? [1, 1.2, 1] : 1,
            }}
            transition={{ duration: 0.8, repeat: expression === 'happy' ? Infinity : 0, delay: 0.4 }}
          />

          {/* NOSE */}
          <ellipse cx="100" cy="76" rx="6" ry="4.5" fill="#FF8FB1" />
          <ellipse cx="100" cy="75" rx="3" ry="2" fill="#FFFFFF" opacity="0.5" />

          {/* MOUTH */}
          <motion.path
            d={
              expression === 'happy' ? 'M92 82 Q100 88 108 82' :
              expression === 'excited' ? 'M90 80 Q100 92 110 80' :
              expression === 'surprised' ? 'M93 78 Q100 88 107 78' :
              expression === 'thinking' ? 'M94 84 Q100 82 106 84' :
              expression === 'confused' ? 'M94 86 Q100 84 106 86' :
              expression === 'proud' ? 'M92 80 Q100 86 108 80' :
              'M95 84 Q100 86 105 84'
            }
            stroke="#2D1B3D"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />

          {/* AI CORE */}
          <motion.g
            animate={{
              scale: isTyping ? [1, 1.3, 1] : 1,
              opacity: isTyping ? [1, 0.8, 1] : 1,
            }}
            transition={{ duration: 0.5, repeat: isTyping ? Infinity : 0 }}
          >
            <circle cx="100" cy="125" r="18" fill="url(#coreGlow)" />
            <circle cx="100" cy="125" r="14" fill="#FFD6E7" />
            <circle cx="100" cy="125" r="10" fill="#FF8FB1" />
            <path d="M96 123 Q98 119 100 121 Q102 119 104 123 Q100 127 96 123Z" fill="#FFFFFF" opacity="0.8" />
          </motion.g>

          {/* HOODIE */}
          <ellipse cx="100" cy="135" rx="45" ry="20" fill="#FFD6E7" opacity="0.4" />
          <ellipse cx="100" cy="135" rx="40" ry="16" fill="#FFFFFF" opacity="0.5" />
          <text x="100" y="138" textAnchor="middle" fontSize="10" fontFamily="'Inter', sans-serif" fontWeight="bold" fill="#FF8FB1" opacity="0.8" letterSpacing="0.5">
            AI
          </text>

          {/* WINGS */}
          <motion.g
            animate={{ rotate: state === 'happy' ? [0, 5, 0] : 0 }}
            transition={{ duration: 1, repeat: state === 'happy' ? Infinity : 0 }}
          >
            <path d="M45 110 Q30 95 35 80 Q40 70 45 75 Q40 85 45 100" fill="#FFD6E7" opacity="0.4" />
            <path d="M45 110 Q35 100 38 90 Q42 85 45 90 Q42 98 45 105" fill="#FFB6C1" opacity="0.3" />
            <path d="M155 110 Q170 95 165 80 Q160 70 155 75 Q160 85 155 100" fill="#FFD6E7" opacity="0.4" />
            <path d="M155 110 Q165 100 162 90 Q158 85 155 90 Q158 98 155 105" fill="#FFB6C1" opacity="0.3" />
          </motion.g>

          {/* PAWS */}
          <motion.g
            animate={{ x: state === 'walk' ? [0, 3, 0, -3, 0] : 0 }}
            transition={{ duration: 0.5, repeat: state === 'walk' ? Infinity : 0 }}
          >
            <ellipse cx="75" cy="175" rx="10" ry="7" fill="#FFF5F7" />
            <ellipse cx="75" cy="175" rx="6" ry="4" fill="#FFD6E7" opacity="0.3" />
            <ellipse cx="125" cy="175" rx="10" ry="7" fill="#FFF5F7" />
            <ellipse cx="125" cy="175" rx="6" ry="4" fill="#FFD6E7" opacity="0.3" />
            <ellipse cx="55" cy="175" rx="8" ry="6" fill="#FFF5F7" />
            <ellipse cx="55" cy="175" rx="5" ry="3" fill="#FFD6E7" opacity="0.3" />
            <ellipse cx="145" cy="175" rx="8" ry="6" fill="#FFF5F7" />
            <ellipse cx="145" cy="175" rx="5" ry="3" fill="#FFD6E7" opacity="0.3" />
          </motion.g>

          {/* SLEEP BUBBLE */}
          {isSleeping && (
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5 }}
            >
              <text x="130" y="25" fontSize="16" fill="#A78BFA" opacity="0.6">💤</text>
              <text x="145" y="20" fontSize="10" fill="#A78BFA" opacity="0.4">Z</text>
              <text x="155" y="15" fontSize="8" fill="#A78BFA" opacity="0.3">z</text>
            </motion.g>
          )}

          {/* SPARKLES */}
          {expression === 'excited' && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {[...Array(6)].map((_, i) => (
                <motion.text
                  key={i}
                  x={50 + Math.random() * 100}
                  y={20 + Math.random() * 40}
                  fontSize="8"
                  fill="#FFD6E7"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: [0, 1, 0] }}
                  transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                >
                  ✦
                </motion.text>
              ))}
            </motion.g>
          )}
        </motion.g>
      </motion.g>
    </svg>
  )
}

export default MochiSVG