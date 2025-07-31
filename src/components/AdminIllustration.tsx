import React from 'react'

interface AdminIllustrationProps {
  className?: string
}

const AdminIllustration: React.FC<AdminIllustrationProps> = ({ className = "w-48 h-48" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 300 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background */}
      <circle
        cx="150"
        cy="150"
        r="140"
        fill="url(#adminGradient)"
        className="animate-pulse"
      />
      
      {/* Computer Screen */}
      <rect
        x="80"
        y="100"
        width="140"
        height="100"
        rx="8"
        fill="#1F2937"
        className="drop-shadow-lg"
      />
      
      {/* Screen Content */}
      <rect
        x="90"
        y="110"
        width="120"
        height="80"
        rx="4"
        fill="#111827"
      />
      
      {/* Chart Bars */}
      <rect x="100" y="160" width="15" height="20" fill="#3B82F6" className="animate-pulse" />
      <rect x="120" y="150" width="15" height="30" fill="#10B981" className="animate-pulse" style={{animationDelay: '0.2s'}} />
      <rect x="140" y="140" width="15" height="40" fill="#F59E0B" className="animate-pulse" style={{animationDelay: '0.4s'}} />
      <rect x="160" y="155" width="15" height="25" fill="#EF4444" className="animate-pulse" style={{animationDelay: '0.6s'}} />
      <rect x="180" y="145" width="15" height="35" fill="#8B5CF6" className="animate-pulse" style={{animationDelay: '0.8s'}} />
      
      {/* Screen Glow */}
      <rect
        x="90"
        y="110"
        width="120"
        height="80"
        rx="4"
        fill="url(#screenGlow)"
        opacity="0.3"
      />
      
      {/* Computer Stand */}
      <rect
        x="140"
        y="200"
        width="20"
        height="30"
        fill="#6B7280"
      />
      
      {/* Computer Base */}
      <ellipse
        cx="150"
        cy="240"
        rx="40"
        ry="8"
        fill="#4B5563"
      />
      
      {/* QR Code */}
      <rect
        x="240"
        y="120"
        width="40"
        height="40"
        fill="white"
        rx="4"
        className="animate-float drop-shadow-md"
      />
      
      {/* QR Code Pattern */}
      <g className="animate-float">
        <rect x="245" y="125" width="3" height="3" fill="black" />
        <rect x="250" y="125" width="3" height="3" fill="black" />
        <rect x="255" y="125" width="3" height="3" fill="black" />
        <rect x="270" y="125" width="3" height="3" fill="black" />
        <rect x="275" y="125" width="3" height="3" fill="black" />
        
        <rect x="245" y="130" width="3" height="3" fill="black" />
        <rect x="275" y="130" width="3" height="3" fill="black" />
        
        <rect x="245" y="135" width="3" height="3" fill="black" />
        <rect x="250" y="135" width="3" height="3" fill="black" />
        <rect x="255" y="135" width="3" height="3" fill="black" />
        <rect x="270" y="135" width="3" height="3" fill="black" />
        <rect x="275" y="135" width="3" height="3" fill="black" />
        
        <rect x="250" y="145" width="3" height="3" fill="black" />
        <rect x="260" y="145" width="3" height="3" fill="black" />
        <rect x="270" y="145" width="3" height="3" fill="black" />
        
        <rect x="245" y="150" width="3" height="3" fill="black" />
        <rect x="255" y="150" width="3" height="3" fill="black" />
        <rect x="265" y="150" width="3" height="3" fill="black" />
        <rect x="275" y="150" width="3" height="3" fill="black" />
        
        <rect x="245" y="155" width="3" height="3" fill="black" />
        <rect x="250" y="155" width="3" height="3" fill="black" />
        <rect x="255" y="155" width="3" height="3" fill="black" />
        <rect x="270" y="155" width="3" height="3" fill="black" />
        <rect x="275" y="155" width="3" height="3" fill="black" />
      </g>
      
      {/* Floating Icons */}
      <g className="animate-float">
        {/* Settings Icon */}
        <circle cx="60" cy="80" r="12" fill="#6366F1" opacity="0.8" />
        <circle cx="60" cy="80" r="6" fill="none" stroke="white" strokeWidth="2" />
        <circle cx="60" cy="80" r="2" fill="white" />
      </g>
      
      <g className="animate-float" style={{animationDelay: '1s'}}>
        {/* Chart Icon */}
        <rect x="250" y="60" width="20" height="20" fill="#10B981" opacity="0.8" rx="4" />
        <rect x="253" y="70" width="2" height="6" fill="white" />
        <rect x="257" y="68" width="2" height="8" fill="white" />
        <rect x="261" y="65" width="2" height="11" fill="white" />
        <rect x="265" y="67" width="2" height="9" fill="white" />
      </g>
      
      <g className="animate-float" style={{animationDelay: '2s'}}>
        {/* Users Icon */}
        <circle cx="80" cy="220" r="12" fill="#F59E0B" opacity="0.8" />
        <circle cx="77" cy="217" r="3" fill="white" />
        <circle cx="83" cy="217" r="3" fill="white" />
        <path d="M72 225 Q77 222 82 225" stroke="white" strokeWidth="2" fill="none" />
        <path d="M78 225 Q83 222 88 225" stroke="white" strokeWidth="2" fill="none" />
      </g>
      
      {/* Gradient Definitions */}
      <defs>
        <linearGradient id="adminGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DBEAFE" />
          <stop offset="100%" stopColor="#BFDBFE" />
        </linearGradient>
        <linearGradient id="screenGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default AdminIllustration