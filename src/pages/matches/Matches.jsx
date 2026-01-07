import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Filter, Search, Trophy, Clock, Zap } from 'lucide-react'
import MatchCard from '../../components/matches/MatchCard'
import LiveMatchCard from '../../components/matches/LiveMatchCard'
import { useMatches } from '../../hooks/useMatches'
import { useWebSocket } from '../../hooks/useWebSocket'

const Matches = () => {
  const { liveMatches, upcomingMatches, featuredMatches } = useMatches()
  const { isConnected } = useWebSocket()
  const [searchQuery, setSearchQuery] = useState('')

  const sports = [
    { id: 'all', name: 'All Sports', icon: '🏆' },
    { id: 'football', name: 'Football', icon: '⚽' },
    { id: 'basketball', name: 'Basketball', icon: '🏀' },
    { id: 'tennis', name: 'Tennis', icon: '🎾' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Matches & Events</h1>
          <p className="text-text-secondary mt-2">
            Track live scores, make predictions, and follow your favorite teams
            {isConnected && <span className="text-primary ml-2">• Live updates active</span>}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={20} />
            <input
              type="text"
              placeholder="Search matches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-card border border-card rounded-xl text-white w-full md:w-64"
            />
          </div>
          <button className="btn-secondary flex items-center space-x-2">
            <Filter size={18} />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Sport Filters */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {sports.map((sport) => (
          <button
            key={sport.id}
            className="flex items-center space-x-2 px-4 py-2.5 bg-card rounded-xl whitespace-nowrap"
          >
            <span>{sport.icon}</span>
            <span>{sport.name}</span>
          </button>
        ))}
      </div>

      {/* Live Matches */}
      {liveMatches.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <h2 className="text-xl font-bold">Live Now</h2>
            <span className="text-sm text-text-secondary">
              {liveMatches.length} matches in progress
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {liveMatches.slice(0, 2).map((match) => (
              <LiveMatchCard key={match.id} match={match} />
            ))}
          </div>
        </motion.div>
      )}

      {/* Featured Matches */}
      {featuredMatches.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center space-x-3">
            <Trophy className="text-yellow-400" size={24} />
            <h2 className="text-xl font-bold">Featured Matches</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {featuredMatches.slice(0, 3).map((match) => (
              <MatchCard key={match.id} match={match} featured />
            ))}
          </div>
        </motion.div>
      )}

      {/* Upcoming Matches */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Clock className="text-primary" size={24} />
            <h2 className="text-xl font-bold">Upcoming Matches</h2>
            <span className="text-sm text-text-secondary">
              {upcomingMatches.length} matches scheduled
            </span>
          </div>
          <button className="text-primary hover:text-primary/80 text-sm font-medium">
            View All →
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {upcomingMatches.slice(0, 6).map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Matches