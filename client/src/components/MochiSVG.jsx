import React from 'react'
import { motion } from 'framer-motion'

const MochiSVG = ({ state = 'idle', expression = 'happy', isSleeping = false, isTyping = false, tailWag = 0, blink = false }) => {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" style={{ filter: 'drop-shadow(0 8px 32px rgba(236,72,153,0.15))' }}>
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
      </defs>
      <motion.g animate={{ scale: isSleeping ? 0.9 : 1, y: isSleeping ? 5 : 0 }} transition={{ duration: 0.8 }}>
        <ellipse cx="100" cy="120" rx="55" ry="60" fill="url(#fur)" />
        <circle cx="70" cy="110" r="18" fill="#FFFFFF" opacity="0.8" />
        <circle cx="130" cy="110" r="18" fill="#FFFFFF" opacity="0.8" />
        <ellipse cx="100" cy="130" rx="35" ry="30" fill="#FFFFFF" opacity="0.7" />
        <motion.g animate={{ rotate: tailWag }} transition={{ duration: 0.3 }}>
          <path d="M155 115 Q175 105 170 85 Q165 75 160 80" stroke="#FFF5F7" strokeWidth="12" fill="none" strokeLinecap="round" />
          <path d="M155 115 Q175 105 170 85 Q165 75 160 80" stroke="#FFD6E7" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.3" />
        </motion.g>
        <motion.g animate={{ rotate: state === 'tilt' ? 8 : 0 }} transition={{ duration: 0.5 }}>
          <ellipse cx="100" cy="65" rx="48" ry="44" fill="url(#fur)" />
          <motion.g animate={{ rotate: state === 'happy' ? [0, 8, 0] : 0 }} transition={{ duration: 0.5, repeat: state === 'happy' ? Infinity : 0 }}>
            <g transform="translate(55, 30)">
              <ellipse cx="0" cy="0" rx="16" ry="22" fill="url(#fur)" transform="rotate(-25)" />
              <ellipse cx="0" cy="0" rx="10" ry="16" fill="url(#ear)" transform="rotate(-25)" opacity="0.7" />
            </g>
            <g transform="translate(145, 30)">
              <ellipse cx="0" cy="0" rx="16" ry="22" fill="url(#fur)" transform="rotate(25)" />
              <ellipse cx="0" cy="0" rx="10" ry="16" fill="url(#ear)" transform="rotate(25)" opacity="0.7" />
            </g>
          </motion.g>
          <circle cx="100" cy="30" r="55" fill="none" stroke="url(#halo)" strokeWidth="2" opacity="0.3" />
          <motion.g animate={{ scaleX: blink ? 0.1 : 1, scaleY: blink ? 0.1 : 1 }} transition={{ duration: 0.15 }}>
            {expression === 'happy' && (
              <>
                <path d="M70 64 Q78 58 86 64" stroke="#2D1B3D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M114 64 Q122 58 130 64" stroke="#2D1B3D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </>
            )}
            {expression === 'thinking' && (
              <>
                <circle cx="78" cy="52" r="6" fill="#2D1B3D" />
                <circle cx="122" cy="52" r="6" fill="#2D1B3D" />
                <circle cx="76" cy="50" r="2" fill="#FFFFFF" opacity="0.7" />
                <circle cx="120" cy="50" r="2" fill="#FFFFFF" opacity="0.7" />
              </>
            )}
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
          </motion.g>
          <circle cx="62" cy="74" r="10" fill="url(#blush)" />
          <circle cx="138" cy="74" r="10" fill="url(#blush)" />
          <ellipse cx="100" cy="76" rx="6" ry="4.5" fill="#FF8FB1" />
          <motion.path
            d={expression === 'happy' ? 'M92 82 Q100 88 108 82' : 'M95 84 Q100 86 105 84'}
            stroke="#2D1B3D" strokeWidth="2" fill="none" strokeLinecap="round"
          />
          <circle cx="100" cy="125" r="18" fill="url(#coreGlow)" />
          <circle cx="100" cy="125" r="14" fill="#FFD6E7" />
          <circle cx="100" cy="125" r="10" fill="#FF8FB1" />
          <ellipse cx="100" cy="135" rx="45" ry="20" fill="#FFD6E7" opacity="0.4" />
          <text x="100" y="138" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#FF8FB1" opacity="0.8">AI</text>
          <path d="M45 110 Q30 95 35 80 Q40 70 45 75 Q40 85 45 100" fill="#FFD6E7" opacity="0.4" />
          <path d="M155 110 Q170 95 165 80 Q160 70 155 75 Q160 85 155 100" fill="#FFD6E7" opacity="0.4" />
          <ellipse cx="75" cy="175" rx="10" ry="7" fill="#FFF5F7" />
          <ellipse cx="125" cy="175" rx="10" ry="7" fill="#FFF5F7" />
          {isSleeping && (
            <>
              <text x="130" y="25" fontSize="16" fill="#A78BFA" opacity="0.6">💤</text>
              <text x="145" y="20" fontSize="10" fill="#A78BFA" opacity="0.4">Z</text>
            </>
          )}
        </motion.g>
      </motion.g>
    </svg>
  )
}

export default MochiSVG