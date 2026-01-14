import React from 'react'

const TopNavFallback = () => {
  return (
    <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="text-white font-bold text-xl">ScoreSense</div>
        <div className="flex items-center space-x-4">
          <div className="text-gray-300">Welcome</div>
          <div className="px-3 py-1 bg-blue-600 rounded-full text-sm">0 points</div>
        </div>
      </div>
    </header>
  )
}

export default TopNavFallback
