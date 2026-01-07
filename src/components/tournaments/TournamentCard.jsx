import React from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  Trophy,
  DollarSign,
  Clock,
  ChevronRight,
  Crown,
  Star,
  Target,
  TrendingUp
} from 'lucide-react'

const TournamentCard = ({ tournament, index }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-400 bg-green-500/20 border-green-500/30'
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30'
      case 'hard': return 'text-red-400 bg-red-500/20 border-red-500/30'
      default: return 'text-blue-400 bg-blue-500/20 border-blue-500/30'
    }
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'ongoing': return 'text-green-400 bg-green-500/20 border-green-500/30'
      case 'upcoming': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30'
      case 'completed': return 'text-blue-400 bg-blue-500/20 border-blue-500/30'
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`card p-6 ${tournament.featured ? 'border-primary/50 ring-1 ring-primary/20' : ''}`}
    >
      {/* Tournament Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start space-x-4">
          <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl ${
            tournament.color === 'yellow' ? 'bg-yellow-500/20' :
            tournament.color === 'red' ? 'bg-red-500/20' :
            tournament.color === 'green' ? 'bg-green-500/20' :
            'bg-orange-500/20'
          }`}>
            {tournament.icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <h3 className="text-xl font-bold">{tournament.name}</h3>
              {tournament.featured && (
                <span className="premium-badge flex items-center space-x-1">
                  <Crown size={12} />
                  <span>FEATURED</span>
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4 mt-2">
              <span className="text-text-secondary flex items-center space-x-1">
                <Target size={14} />
                <span>{tournament.sport}</span>
              </span>
              <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-lg ${getDifficultyColor(tournament.difficulty)}`}>
                <TrendingUp size={12} />
                <span className="text-xs font-medium">{tournament.difficulty}</span>
              </span>
              <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-lg ${getStatusColor(tournament.status)}`}>
                <span className="text-xs font-medium">{tournament.status.toUpperCase()}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tournament Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-card p-4 rounded-xl">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="text-text-secondary" size={16} />
            <span className="text-sm text-text-secondary">Participants</span>
          </div>
          <div className="text-2xl font-bold">{tournament.participants.toLocaleString()}</div>
        </div>

        <div className="bg-card p-4 rounded-xl">
          <div className="flex items-center space-x-2 mb-2">
            <Trophy className="text-text-secondary" size={16} />
            <span className="text-sm text-text-secondary">Prize Pool</span>
          </div>
          <div className="text-2xl font-bold text-primary">{tournament.prizePool.toLocaleString()} PTS</div>
        </div>

        <div className="bg-card p-4 rounded-xl">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="text-text-secondary" size={16} />
            <span className="text-sm text-text-secondary">Entry Fee</span>
          </div>
          <div className="text-2xl font-bold">{tournament.entryFee} PTS</div>
        </div>

        <div className="bg-card p-4 rounded-xl">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="text-text-secondary" size={16} />
            <span className="text-sm text-text-secondary">Duration</span>
          </div>
          <div className="text-2xl font-bold">{tournament.endDate}</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-text-secondary">Registration Progress</span>
          <span className="text-sm font-bold">{Math.round((tournament.participants / 2000) * 100)}%</span>
        </div>
        <div className="w-full bg-card rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((tournament.participants / 2000) * 100, 100)}%` }}
            className="h-2 bg-primary rounded-full"
          />
        </div>
        <div className="flex justify-between text-xs text-text-secondary mt-2">
          <span>Min: 10</span>
          <span>Target: 2,000</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-card">
        <div className="flex items-center space-x-4">
          <div className="text-sm text-text-secondary">
            Starts: {tournament.startDate}
          </div>
          <div className="text-sm text-text-secondary">
            ID: #{tournament.id.toString().padStart(6, '0')}
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="btn-secondary flex items-center space-x-2">
            <Star size={16} />
            <span>Details</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <span>Enter Tournament</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default TournamentCard