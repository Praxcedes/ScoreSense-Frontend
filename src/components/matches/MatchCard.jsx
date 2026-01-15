import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Users, Target } from 'lucide-react'
import { usePoints } from '../../hooks/usePoints'
import { toast } from 'react-hot-toast'

const MatchCard = ({ match, compact = false, featured = false }) => {
  const { makePrediction, points, minPredictionStake, walletConnected } = usePoints()
  const minStake = minPredictionStake ?? 10
  const stakeMax = Math.max(minStake, Math.min(points || minStake, 1000))
  const [selectedPrediction, setSelectedPrediction] = useState(null)
  const [stake, setStake] = useState(minStake)
  const [predicting, setPredicting] = useState(false)
  const homeTeam = match.homeTeam || match.home_team || 'Home'
  const awayTeam = match.awayTeam || match.away_team || 'Away'
  const homeLogo = match.homeLogo || match.home_logo
  const awayLogo = match.awayLogo || match.away_logo

  const clampStake = (value) => {
    if (!Number.isFinite(value)) return minStake
    return Math.min(Math.max(value, minStake), stakeMax)
  }

  const getMatchLabel = () => {
    if (match.name) return match.name
    if (homeTeam && awayTeam) return `${homeTeam} vs ${awayTeam}`
    return match.league || 'Match'
  }

  const handlePredict = async () => {
    if (!walletConnected) {
      toast.error('Connect your wallet to make predictions')
      return
    }

    if (!selectedPrediction) {
      toast.error('Please select a prediction')
      return
    }

    if (stake < minStake) {
      toast.error(`Minimum stake is ${minStake} points`)
      return
    }

    if (stake > points) {
      toast.error('Insufficient points')
      return
    }

    setPredicting(true)
    const oddsMap = {
      home_win: match.odds?.home || match.odds_home || 2.0,
      draw: match.odds?.draw || match.odds_draw || 3.0,
      away_win: match.odds?.away || match.odds_away || 3.5
    }
    const odds = Number(oddsMap[selectedPrediction] || 1.5)

    const result = await makePrediction(match.id, selectedPrediction, stake, {
      match: getMatchLabel(),
      odds,
      confidence: 65,
      potential: Math.round(stake * odds)
    })
    setPredicting(false)

    if (result.success) {
      toast.success('Prediction placed successfully!')
    } else {
      toast.error(result.error || 'Failed to place prediction')
    }
  }

  const formatTime = (dateString) => {
    if (!dateString || !String(dateString).includes('T')) {
      return 'TBD'
    }
    const date = new Date(dateString)
    if (Number.isNaN(date.getTime())) {
      return 'TBD'
    }
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'TBD'
    const date = new Date(dateString)
    if (Number.isNaN(date.getTime())) {
      return 'TBD'
    }
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'live': return 'text-red-400'
      case 'upcoming': return 'text-green-400'
      case 'ended':
      case 'completed':
        return 'text-text-secondary'
      case 'cancelled':
        return 'text-red-400'
      default: return 'text-yellow-400'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'live': return 'Live'
      case 'upcoming': return 'Upcoming'
      case 'ended':
      case 'completed':
        return 'Ended'
      case 'cancelled':
        return 'Cancelled'
      case 'halftime': return 'Halftime'
      default: return status
    }
  }
  const isFinal = match.status === 'ended' || match.status === 'completed'

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 bg-card border border-border rounded-xl hover:bg-hover transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-card border border-border overflow-hidden flex items-center justify-center">
              {homeLogo ? (
                <img src={homeLogo} alt={`${homeTeam} logo`} className="w-full h-full object-cover" />
              ) : (
                <span className="text-lg">⚽</span>
              )}
            </div>
            <div>
              <h3 className="font-bold">{match.league}</h3>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Calendar size={14} />
                <span>{formatDate(match.startDate || match.startTime)} • {formatTime(match.startTime)}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-sm font-medium ${getStatusColor(match.status)}`}>
              {getStatusText(match.status)}
            </div>
            <div className="text-xs text-text-secondary">Football</div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`p-6 bg-card border border-border rounded-2xl hover:shadow-lg transition-all ${
        featured ? 'ring-2 ring-primary/20' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-card border border-border overflow-hidden flex items-center justify-center">
            {homeLogo ? (
              <img src={homeLogo} alt={`${homeTeam} logo`} className="w-full h-full object-cover" />
            ) : (
              <span className="text-lg">⚽</span>
            )}
          </div>
          <div>
            <h3 className="font-bold">{match.league}</h3>
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <Calendar size={14} />
              <span>{formatDate(match.startDate || match.startTime)} • {formatTime(match.startTime)}</span>
              <MapPin size={14} />
              <span>{match.venue}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-sm font-medium ${getStatusColor(match.status)}`}>
            {getStatusText(match.status)}
          </div>
          <div className="text-xs text-text-secondary">Football</div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-card border border-border overflow-hidden flex items-center justify-center">
            {homeLogo ? (
              <img src={homeLogo} alt={`${homeTeam} logo`} className="w-full h-full object-cover" />
            ) : (
              <span className="text-lg">{homeTeam.charAt(0)}</span>
            )}
          </div>
          <div className="text-2xl font-bold">{homeTeam}</div>
          <div className="text-sm text-text-secondary">Home</div>
        </div>

        <div className="flex flex-col items-center">
          {match.status === 'live' || isFinal ? (
            <div className="text-3xl font-bold">
              {match.homeScore} - {match.awayScore}
            </div>
          ) : (
            <div className="text-2xl font-bold text-text-secondary">VS</div>
          )}
          <div className="text-sm text-text-secondary mt-1">
            {match.status === 'upcoming' ? 'Starts soon' :
             match.status === 'live' ? 'Playing now' : match.status === 'cancelled' ? 'Cancelled' : 'Final'}
          </div>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-card border border-border overflow-hidden flex items-center justify-center">
            {awayLogo ? (
              <img src={awayLogo} alt={`${awayTeam} logo`} className="w-full h-full object-cover" />
            ) : (
              <span className="text-lg">{awayTeam.charAt(0)}</span>
            )}
          </div>
          <div className="text-2xl font-bold">{awayTeam}</div>
          <div className="text-sm text-text-secondary">Away</div>
        </div>
      </div>

      {match.status === 'live' && (
        <div className="mb-6">
          <div className="flex justify-between text-sm text-text-secondary mb-2">
            <span>Possession</span>
            <span>{match.homePossession || 50}% - {match.awayPossession || 50}%</span>
          </div>
          <div className="h-2 bg-surface rounded-full overflow-hidden">
            <div
              className="h-full bg-primary"
              style={{ width: `${match.homePossession || 50}%` }}
            ></div>
          </div>
        </div>
      )}

      {match.status === 'upcoming' && (
        <div className="mb-6 p-4 bg-surface rounded-xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Target size={16} className="text-primary" />
              <span className="font-medium">Prediction</span>
            </div>
            <div className="text-sm text-text-secondary">
              Stake: <span className="font-bold text-white">{stake} PTS</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-3">
            <button
              onClick={() => setSelectedPrediction('home_win')}
              className={`p-2 rounded-lg text-center transition-colors ${
                selectedPrediction === 'home_win'
                  ? 'bg-primary text-white'
                  : 'bg-card hover:bg-hover'
              }`}
            >
              <div className="font-bold">Home</div>
              <div className="text-sm opacity-80">{match.odds?.home || match.odds_home || '2.0'}</div>
            </button>

            <button
              onClick={() => setSelectedPrediction('draw')}
              className={`p-2 rounded-lg text-center transition-colors ${
                selectedPrediction === 'draw'
                  ? 'bg-primary text-white'
                  : 'bg-card hover:bg-hover'
              }`}
            >
              <div className="font-bold">Draw</div>
              <div className="text-sm opacity-80">{match.odds?.draw || match.odds_draw || '3.0'}</div>
            </button>

            <button
              onClick={() => setSelectedPrediction('away_win')}
              className={`p-2 rounded-lg text-center transition-colors ${
                selectedPrediction === 'away_win'
                  ? 'bg-primary text-white'
                  : 'bg-card hover:bg-hover'
              }`}
            >
              <div className="font-bold">Away</div>
              <div className="text-sm opacity-80">{match.odds?.away || match.odds_away || '3.5'}</div>
            </button>
          </div>

          <div className="mt-3 space-y-3">
            <input
              type="range"
              min={minStake}
              max={stakeMax}
              step="10"
              value={stake}
              onChange={(e) => setStake(clampStake(parseInt(e.target.value, 10)))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-text-secondary mt-1">
              <span>{minStake} PTS</span>
              <span>{stake} PTS</span>
              <span>{stakeMax} PTS</span>
            </div>
            <input
              type="number"
              min={minStake}
              max={stakeMax}
              value={stake}
              onChange={(e) => setStake(clampStake(parseInt(e.target.value, 10)))}
              className="input-field w-full"
            />
          </div>

          <button
            onClick={handlePredict}
            disabled={predicting || points < stake}
            className="w-full mt-4 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {predicting ? 'Placing...' : 'Place Prediction'}
          </button>
        </div>
      )}

      <div className="flex justify-between text-sm text-text-secondary">
        <div className="flex items-center">
          <Users size={14} className="mr-1" />
          <span>Predictions: 1.2k</span>
        </div>
        <div>Starts in 2h 30m</div>
      </div>
    </motion.div>
  )
}

export default MatchCard
