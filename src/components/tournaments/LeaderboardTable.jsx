import React from 'react'
import { motion } from 'framer-motion'
import { Crown, TrendingUp, TrendingDown, Minus } from 'lucide-react'

const LeaderboardTable = ({ leaderboard }) => {
  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/30'
      case 2: return 'bg-gradient-to-r from-gray-500/20 to-gray-600/20 border-gray-500/30'
      case 3: return 'bg-gradient-to-r from-orange-500/20 to-orange-600/20 border-orange-500/30'
      default: return ''
    }
  }

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Crown className="text-yellow-400" size={16} />
      case 2: return <Crown className="text-gray-400" size={16} />
      case 3: return <Crown className="text-orange-400" size={16} />
      default: return null
    }
  }

  const getChangeIcon = (change) => {
    if (change > 0) return <TrendingUp className="text-green-400" size={16} />
    if (change < 0) return <TrendingDown className="text-red-400" size={16} />
    return <Minus className="text-text-secondary" size={16} />
  }

  return (
    <div className="space-y-3">
      {leaderboard.map((player, index) => (
        <motion.div
          key={player.rank}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className={`flex items-center justify-between p-4 rounded-xl border ${
            player.name === 'You' 
              ? 'bg-primary/10 border-primary/30' 
              : getRankColor(player.rank) || 'bg-card border-card hover:bg-hover'
          } transition-colors`}
        >
          <div className="flex items-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
              player.rank === 1 ? 'bg-yellow-500 text-white' :
              player.rank === 2 ? 'bg-gray-500 text-white' :
              player.rank === 3 ? 'bg-orange-500 text-white' :
              'bg-surface text-text-secondary'
            }`}>
              {getRankIcon(player.rank) || player.rank}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold">{player.name}</span>
                {player.name === 'You' && (
                  <span className="text-xs px-2 py-0.5 bg-primary/20 text-primary rounded-full">
                    YOU
                  </span>
                )}
              </div>
              <div className="text-sm text-text-secondary">{player.accuracy}% accuracy</div>
            </div>
          </div>

          <div className="text-right">
            <div className="font-bold">{player.points.toLocaleString()} PTS</div>
            <div className="flex items-center justify-end space-x-1 text-sm">
              {getChangeIcon(player.change)}
              <span className={player.change > 0 ? 'text-green-400' : player.change < 0 ? 'text-red-400' : 'text-text-secondary'}>
                {Math.abs(player.change)}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default LeaderboardTable
