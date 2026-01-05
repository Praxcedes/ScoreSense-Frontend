import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Filter, 
  Search, 
  Flame, 
  Trophy, 
  Clock,
  ChevronDown,
  Zap
} from 'lucide-react'
import { useMatches } from '../../hooks/useMatches'
import { useWebSocket } from '../../hooks/useWebSocket'
import MatchCard from '../../components/matches/MatchCard'
import LiveMatchCard from '../../components/matches/LiveMatchCard'
import Loader from '../../components/common/Loader'

const Matches = () => {
  const { liveMatches, upcomingMatches, featuredMatches, loading } = useMatches()
  const { isConnected } = useWebSocket()
  const [activeSport, setActiveSport] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [timeFilter, setTimeFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  const sports = [
    { id: 'all', name: 'All Sports', icon: '🏆' },
    { id: 'football', name: 'Football', icon: '⚽' },
    { id: 'basketball', name: 'Basketball', icon: '🏀' },
    { id: 'tennis', name: 'Tennis', icon: '🎾' },
    { id: 'cricket', name: 'Cricket', icon: '🏏' },
    { id: 'rugby', name: 'Rugby', icon: '🏉' }
  ]

  const timeFilters = [
    { id: 'all', name: 'All Time' },
    { id: 'live', name: 'Live Now' },
    { id: 'today', name: 'Today' },
    { id: 'tomorrow', name: 'Tomorrow' },
    { id: 'week', name: 'This Week' }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader size="large" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Matches & Events</h1>
          <p className="text-text-secondary mt-2">
            Track live scores, make predictions, and follow your favorite teams
            {isConnected && <span className="text-primary ml-2">• Live updates active</span>}
          </p>
        </div>
        <div className="flex items-center space-x-2">
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
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary flex items-center space-x-2"
          >
            <Filter size={18} />
            <span>Filters</span>
          </button>
        </div>
      </motion.div>

      {/* Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="card p-4 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Sport
                </label>
                <div className="flex flex-wrap gap-2">
                  {sports.map((sport) => (
                    <button
                      key={sport.id}
                      onClick={() => setActiveSport(sport.id)}
                      className={`px-3 py-2 rounded-lg flex items-center space-x-2 transition-all ${
                        activeSport === sport.id
                          ? 'bg-primary text-white'
                          : 'bg-card text-text-secondary hover:text-white'
                      }`}
                    >
                      <span>{sport.icon}</span>
                      <span>{sport.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Time
                </label>
                <div className="flex flex-wrap gap-2">
                  {timeFilters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setTimeFilter(filter.id)}
                      className={`px-3 py-2 rounded-lg transition-all ${
                        timeFilter === filter.id
                          ? 'bg-primary text-white'
                          : 'bg-card text-text-secondary hover:text-white'
                      }`}
                    >
                      {filter.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Matches Section */}
      {liveMatches.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <h2 className="text-xl font-bold">Live Now</h2>
              <span className="text-sm text-text-secondary">
                {liveMatches.length} matches in progress
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="text-yellow-400" size={18} />
              <span className="text-sm text-yellow-400">Updates every 10s</span>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {liveMatches.map((match) => (
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
            <Flame className="text-orange-500" size={24} />
            <h2 className="text-xl font-bold">Featured Matches</h2>
            <span className="text-sm bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full">
              High Stakes
            </span>
          </div>
          <div className="grid-matches">
            {featuredMatches.map((match) => (
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
            View Calendar →
          </button>
        </div>
        <div className="grid-matches">
          {upcomingMatches.slice(0, 6).map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </motion.div>

      {/* Empty State */}
      {liveMatches.length === 0 && upcomingMatches.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card p-12 text-center"
        >
          <Trophy className="mx-auto text-text-secondary" size={48} />
          <h3 className="text-xl font-bold mt-4">No matches available</h3>
          <p className="text-text-secondary mt-2">
            Check back later for upcoming matches or try adjusting your filters.
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default Matches