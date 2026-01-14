import React, { useState, useMemo } from 'react'
import { useMatches } from '../../hooks/useMatches'
import { motion } from 'framer-motion'
import { Loader2, RefreshCw, Filter, Calendar, Flame, Star } from 'lucide-react'
import PredictionForm from '../../components/predictions/PredictionForm'

const Matches = () => {
  // Safely get matches data with defaults
  const matchesContext = useMatches()
  
  // Provide safe defaults if context is missing properties
  const {
    liveMatches = [],
    upcomingMatches = [],
    featuredMatches = [],
    loading = false,
    error = null,
    refreshMatches = () => Promise.resolve()
  } = matchesContext || {}

  console.log('Matches context:', matchesContext)
  console.log('Live matches:', liveMatches)

  const [activeTab, setActiveTab] = useState('live')
  const [refreshing, setRefreshing] = useState(false)
  const [selectedSport, setSelectedSport] = useState("all")
  const [showPredictionForm, setShowPredictionForm] = useState(false)
  const [selectedMatch, setSelectedMatch] = useState(null)

  const handleRefresh = async () => {
    console.log("Refreshing matches...")
    setRefreshing(true)
    try {
      await refreshMatches()
    } catch (err) {
      console.error('Error refreshing matches:', err)
    } finally {
      setRefreshing(false)
    }
  }

  const filteredMatches = useMemo(() => {
    switch (activeTab) {
      case 'live':
        return liveMatches || []
      case 'upcoming':
        return upcomingMatches || []
      case 'featured':
        return featuredMatches || []
      default:
        return []
    }
  }, [activeTab, liveMatches, upcomingMatches, featuredMatches])

  const openPredictionForm = (match) => {
    setSelectedMatch(match)
    setShowPredictionForm(true)
  }

  const closePredictionForm = () => {
    setShowPredictionForm(false)
    setSelectedMatch(null)
  }

  const renderTeamBadge = (logo, fallback) => {
    if (logo) {
      return (
        <img
          src={logo}
          alt={fallback}
          className="w-10 h-10 rounded-full object-cover"
        />
      )
    }

    return (
      <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center">
        <span className="font-bold">{fallback}</span>
      </div>
    )
  }

  if (loading && !refreshing) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-text-secondary">Loading matches...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl">⚠️</span>
          </div>
          <h3 className="mt-4 text-xl font-semibold">Error Loading Matches</h3>
          <p className="mt-2 text-text-secondary">{error}</p>
          <button
            onClick={handleRefresh}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Live Matches</h1>
          <p className="text-text-secondary mt-1">Real-time scores and predictions</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center space-x-2 px-4 py-2.5 bg-card border border-card rounded-xl hover:bg-card/80 transition-colors disabled:opacity-50"
          >
            <RefreshCw size={18} className={refreshing ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2.5 bg-card border border-card rounded-xl hover:bg-card/80 transition-colors">
            <Filter size={18} />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-card rounded-xl p-1 mb-8">
        {[
          { id: 'live', icon: <Flame size={18} />, label: 'Live', count: liveMatches?.length || 0 },
          { id: 'upcoming', icon: <Calendar size={18} />, label: 'Upcoming', count: upcomingMatches?.length || 0 },
          { id: 'featured', icon: <Star size={18} />, label: 'Featured', count: featuredMatches?.length || 0 }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-colors ${
              activeTab === tab.id
                ? 'bg-surface text-white'
                : 'text-text-secondary hover:text-white'
            }`}
          >
            {tab.icon}
            <span className="font-medium">{tab.label}</span>
            {tab.count > 0 && (
              <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Matches Grid */}
      {filteredMatches.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-card rounded-full flex items-center justify-center mx-auto">
            {activeTab === 'live' ? <Flame size={24} className="text-text-secondary" /> :
             activeTab === 'upcoming' ? <Calendar size={24} className="text-text-secondary" /> :
             <Star size={24} className="text-text-secondary" />}
          </div>
          <h3 className="mt-4 text-xl font-semibold">No {activeTab} matches</h3>
          <p className="mt-2 text-text-secondary max-w-md mx-auto">
            {activeTab === 'live' ? 'There are no live matches at the moment. Check back later!' :
             activeTab === 'upcoming' ? 'No upcoming matches scheduled.' :
             'No featured matches available.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMatches.slice(0, 6).map((match, index) => (
            <motion.div
              key={match.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div className="bg-card border border-card rounded-xl p-5 hover:border-primary/30 transition-all duration-300">
                {/* Match Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-bold">⚽</span>
                    </div>
                    <span className="text-sm font-medium">{match.sport || 'Football'}</span>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    match.status === 'live' ? 'bg-red-500/10 text-red-400' :
                    match.status === 'finished' ? 'bg-green-500/10 text-green-400' :
                    'bg-blue-500/10 text-blue-400'
                  }`}>
                    {match.status || 'upcoming'}
                  </div>
                </div>

                {/* Teams */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {renderTeamBadge(match.homeLogo, match.homeTeam?.charAt(0) || 'H')}
                      <div>
                        <h4 className="font-semibold">{match.homeTeam || 'Home Team'}</h4>
                        <p className="text-xs text-text-secondary">Home</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{match.homeScore || '0'}</div>
                      <div className="text-xs text-text-secondary">Score</div>
                    </div>
                  </div>

                  <div className="text-center text-text-secondary">VS</div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {renderTeamBadge(match.awayLogo, match.awayTeam?.charAt(0) || 'A')}
                      <div>
                        <h4 className="font-semibold">{match.awayTeam || 'Away Team'}</h4>
                        <p className="text-xs text-text-secondary">Away</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{match.awayScore || '0'}</div>
                      <div className="text-xs text-text-secondary">Score</div>
                    </div>
                  </div>
                </div>

                {/* Match Info */}
                <div className="mt-6 pt-4 border-t border-card">
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-text-secondary">League:</div>
                    <div className="font-medium">{match.league || 'Premier League'}</div>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <div className="text-text-secondary">Time:</div>
                    <div className="font-medium">{match.time || '00:00'}</div>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => openPredictionForm(match)}
                  className="w-full mt-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Predict & Earn Points
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {showPredictionForm && selectedMatch && (
        <PredictionForm
          onClose={closePredictionForm}
          match={selectedMatch}
          allowLive
        />
      )}
    </div>
  )
}

export default Matches
