import React from 'react'

interface VotingIllustrationProps {
  className?: string
}

const VotingIllustration: React.FC<VotingIllustrationProps> = ({ className = "w-64 h-64" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Circle */}
      <circle
        cx="200"
        cy="200"
        r="180"
        fill="url(#gradient1)"
        className="animate-pulse"
      />
      
      {/* Ballot Box */}
      <rect
        x="120"
        y="180"
        width="160"
        height="120"
        rx="15"
        fill="#4F46E5"
        className="drop-shadow-lg"
      />
      
      {/* Ballot Box Top */}
      <rect
        x="110"
        y="170"
        width="180"
        height="20"
        rx="10"
        fill="#6366F1"
      />
      
      {/* Ballot Slot */}
      <rect
        x="180"
        y="175"
        width="40"
        height="4"
        rx="2"
        fill="#1E1B4B"
      />
      
      {/* Ballot Paper */}
      <rect
        x="150"
        y="120"
        width="100"
        height="80"
        rx="8"
        fill="white"
        className="animate-float drop-shadow-md"
        transform="rotate(-10 200 160)"
      />
      
      {/* Checkmarks on Ballot */}
      <g transform="rotate(-10 200 160)">
        <circle cx="165" cy="140" r="3" fill="#10B981" />
        <path
          d="M163 140 L165 142 L168 138"
          stroke="white"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        <circle cx="165" cy="155" r="3" fill="#10B981" />
        <path
          d="M163 155 L165 157 L168 153"
          stroke="white"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      
      {/* Hand */}
      <ellipse
        cx="280"
        cy="140"
        rx="25"
        ry="35"
        fill="#FBBF24"
        transform="rotate(20 280 140)"
        className="animate-bounce"
      />
      
      {/* Fingers */}
      <ellipse
        cx="290"
        cy="120"
        rx="8"
        ry="15"
        fill="#FBBF24"
        transform="rotate(15 290 120)"
        className="animate-bounce"
      />
      
      {/* Stars */}
      <g className="animate-pulse">
        <path
          d="M100 100 L102 106 L108 106 L103 110 L105 116 L100 112 L95 116 L97 110 L92 106 L98 106 Z"
          fill="#F59E0B"
        />
        <path
          d="M320 80 L322 86 L328 86 L323 90 L325 96 L320 92 L315 96 L317 90 L312 86 L318 86 Z"
          fill="#F59E0B"
        />
        <path
          d="M80 280 L82 286 L88 286 L83 290 L85 296 L80 292 L75 296 L77 290 L72 286 L78 286 Z"
          fill="#F59E0B"
        />
      </g>
      
      {/* Gradient Definitions */}
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E0E7FF" />
          <stop offset="100%" stopColor="#C7D2FE" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default VotingIllustration