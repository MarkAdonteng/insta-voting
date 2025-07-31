import React from 'react'

interface SuccessIllustrationProps {
  className?: string
}

const SuccessIllustration: React.FC<SuccessIllustrationProps> = ({ className = "w-48 h-48" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 300 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Circle */}
      <circle
        cx="150"
        cy="150"
        r="140"
        fill="url(#successGradient)"
        className="animate-pulse"
      />
      
      {/* Success Circle */}
      <circle
        cx="150"
        cy="150"
        r="80"
        fill="#10B981"
        className="animate-bounce drop-shadow-lg"
      />
      
      {/* Checkmark */}
      <path
        d="M120 150 L140 170 L180 130"
        stroke="white"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-pulse"
      />
      
      {/* Confetti */}
      <g className="animate-float">
        {/* Confetti pieces */}
        <rect x="80" y="80" width="8" height="8" fill="#F59E0B" transform="rotate(45 84 84)" />
        <rect x="220" y="90" width="6" height="6" fill="#EF4444" transform="rotate(30 223 93)" />
        <rect x="70" y="200" width="10" height="10" fill="#3B82F6" transform="rotate(60 75 205)" />
        <rect x="230" y="210" width="7" height="7" fill="#8B5CF6" transform="rotate(15 233.5 213.5)" />
        <rect x="90" y="250" width="9" height="9" fill="#EC4899" transform="rotate(75 94.5 254.5)" />
        <rect x="210" y="60" width="5" height="5" fill="#10B981" transform="rotate(90 212.5 62.5)" />
      </g>
      
      {/* Stars */}
      <g className="animate-pulse">
        <path
          d="M60 120 L62 126 L68 126 L63 130 L65 136 L60 132 L55 136 L57 130 L52 126 L58 126 Z"
          fill="#F59E0B"
        />
        <path
          d="M240 180 L242 186 L248 186 L243 190 L245 196 L240 192 L235 196 L237 190 L232 186 L238 186 Z"
          fill="#F59E0B"
        />
        <path
          d="M80 60 L82 66 L88 66 L83 70 L85 76 L80 72 L75 76 L77 70 L72 66 L78 66 Z"
          fill="#F59E0B"
        />
        <path
          d="M220 240 L222 246 L228 246 L223 250 L225 256 L220 252 L215 256 L217 250 L212 246 L218 246 Z"
          fill="#F59E0B"
        />
      </g>
      
      {/* Floating Hearts */}
      <g className="animate-float" style={{animationDelay: '0.5s'}}>
        <path
          d="M100 180 C100 175 105 170 110 170 C115 170 120 175 120 180 C120 185 110 195 110 195 C110 195 100 185 100 180 Z"
          fill="#EC4899"
        />
        <path
          d="M180 100 C180 97 183 94 186 94 C189 94 192 97 192 100 C192 103 186 109 186 109 C186 109 180 103 180 100 Z"
          fill="#EC4899"
        />
      </g>
      
      {/* Sparkles */}
      <g className="animate-pulse" style={{animationDelay: '1s'}}>
        <circle cx="120" cy="80" r="3" fill="#FBBF24" />
        <circle cx="180" cy="220" r="2" fill="#FBBF24" />
        <circle cx="260" cy="140" r="4" fill="#FBBF24" />
        <circle cx="40" cy="160" r="2" fill="#FBBF24" />
      </g>
      
      {/* Gradient Definitions */}
      <defs>
        <linearGradient id="successGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D1FAE5" />
          <stop offset="100%" stopColor="#A7F3D0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default SuccessIllustration