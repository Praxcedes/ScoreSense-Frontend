import React from 'react'

const CoinClashAnimation = ({ status = 'ACTIVE' }) => {
  return (
    <div className="relative flex items-center justify-center">
      <style>{`
        @keyframes coinFlip {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(180deg); }
          100% { transform: rotateY(360deg); }
        }

        @keyframes coinGlow {
          0%, 100% { box-shadow: 0 0 16px rgba(250, 204, 21, 0.35); }
          50% { box-shadow: 0 0 28px rgba(251, 146, 60, 0.6); }
        }
      `}</style>
      <div className="relative">
        <div
          className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white text-3xl font-bold"
          style={{ animation: 'coinFlip 1.6s linear infinite, coinGlow 2.4s ease-in-out infinite' }}
        >
          CC
        </div>
        <div className="absolute inset-0 rounded-full border border-yellow-200/50"></div>
      </div>
      <div className="absolute -bottom-8 text-xs uppercase tracking-widest text-text-secondary">
        {status === 'ACTIVE' ? 'Round In Progress' : 'Waiting'}
      </div>
    </div>
  )
}

export default CoinClashAnimation
