import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  MapPin, 
  Users, 
  ChevronRight,
  Trophy,
  TrendingUp,
  BarChart3
} from 'lucide-react'
import { usePoints } from '../../hooks/usePoints'
import { toast } from 'react-hot-toast'

const MatchCard = ({ match, compact = false, featured = false, onPredict }) => {
  const { makePrediction, points } = usePoints()
  const [selectedOutcome, setSelectedOutcome] = useState(null)
  const [stake, setStake] = useState(50)
  const [predicting, setPredicting] = useState(false)

  // Default match data if none provided
  const defaultMatch = {
    id: 1,
    league: 'Premier League',
    date: 'Today • 19:30',
    venue: 'Etihad Stadium',
    homeTeam: 'Man City',
    awayTeam: 'Arsenal',
    homeRecord: 'W15 D2 L3',
    awayRecord: 'W14 D4 L2',
    homeOdds: 1.85,
    drawOdds: 3.50,
    awayOdds: 4.20,
    homeWinProb: 55,
    awayWinProb: 45,
    status: 'upcoming'
  }

  const matchData = match || defaultMatch

  const handlePredict = async () => {
    if (!selectedOutcome) {
      toast.error('Please select a prediction')
      return
    }

    if (stake > points) {
      toast.error('Insufficient points')
      return
    }

    setPredicting(true)
    const result = await makePrediction(matchData.id, selectedOutcome, stake)
    setPredicting(false)

    if (result.success) {
      toast.success('Prediction placed successfully!')
      onPredict?.({
        match: `${matchData.homeTeam} vs ${matchData.awayTeam}`,
        prediction: selectedOutcome,
        stake,
        potential: Math.round(stake * (selectedOutcome === 'Home Win' ? matchData.homeOdds : 
                                      selectedOutcome === 'Draw' ? matchData.drawOdds : 
                                      matchData.awayOdds))
      })
    } else {
      toast.error(result.error)
    }
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`match-card ${featured ? 'ring-2 ring-primary/30' : ''}`}
    >
      {/* Match Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-card rounded-lg">
            <span className="text-xl">⚽</span>
          </div>
          <div>
            <h3 className="font-bold">{matchData.league}</h3>
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <Calendar size={14} />
              <span>{matchData.date}</span>
              <MapPin size={14} />
              <span>{matchData.venue}</span>
            </div>
          </div>
        </div>
        {matchData.status === 'live' && (
          <div className="live-badge">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span>LIVE</span>
          </div>
        )}
        {featured && (
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            FEATURED
          </div>
        )}
      </div>

      {/* Teams & Score */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="text-center flex-1">
            <div className="text-2xl font-bold mb-2">{matchData.homeTeam}</div>
            <div className="flex items-center justify-center space-x-3">
              <div className="text-sm text-text-secondary">{matchData.homeRecord}</div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="text-green-400" size={14} />
                <span className="text-sm font-medium text-green-400">{matchData.homeWinProb}%</span>
              </div>
            </div>
          </div>
          
          <div className="px-4">
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">VS</div>
              <div className="text-sm text-text-secondary">{matchData.time || matchData.date.split('•')[1]}</div>
            </div>
          </div>
          
          <div className="text-center flex-1">
            <div className="text-2xl font-bold mb-2">{matchData.awayTeam}</div>
            <div className="flex items-center justify-center space-x-3">
              <div className="flex items-center space-x-1">
                <TrendingUp className="text-green-400" size={14} />
                <span className="text-sm font-medium text-green-400">{matchData.awayWinProb}%</span>
              </div>
              <div className="text-sm text-text-secondary">{matchData.awayRecord}</div>
            </div>
          </div>
        </div>

        {/* Odds */}
        <div className="flex justify-center space-x-4 mt-6">
          <div className="text-center">
            <div className="text-xs text-text-secondary mb-1">Home</div>
            <div className="font-bold text-lg">{matchData.homeOdds}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-text-secondary mb-1">Draw</div>
            <div className="font-bold text-lg">{matchData.drawOdds}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-text-secondary mb-1">Away</div>
            <div className="font-bold text-lg">{matchData.awayOdds}</div>
          </div>
        </div>
      </div>

      {/* Prediction Section (if not compact) */}
      {!compact && (
        <div className="border-t border-card pt-6">
          <h4 className="font-bold mb-4 flex items-center space-x-2">
            <Trophy size={18} />
            <span>Make Prediction</span>
          </h4>
          
          <div className="space-y-4">
            {/* Prediction Options */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Home Win', odds: matchData.homeOdds },
                { label: 'Draw', odds: matchData.drawOdds },
                { label: 'Away Win', odds: matchData.awayOdds }
              ].map((option) => (
                <button
                  key={option.label}
                  onClick={() => setSelectedOutcome(option.label)}
                  className={`py-3 rounded-xl font-medium transition-all ${
                    selectedOutcome === option.label
                      ? 'bg-primary text-white ring-2 ring-primary/50'
                      : 'bg-card text-text-secondary hover:text-white hover:bg-hover'
                  }`}
                >
                  <div>{option.label}</div>
                  <div className="text-sm opacity-80">{option.odds}</div>
                </button>
              ))}
            </div>

            {/* Stake Control */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Stake Amount</span>
                <span className="text-sm text-text-secondary">
                  Balance: <span className="font-bold text-primary">{points} PTS</span>
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="10"
                    max={Math.min(points, 500)}
                    step="10"
                    value={stake}
                    onChange={(e) => setStake(parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <div className="w-24 text-center">
                    <div className="text-2xl font-bold">{stake}</div>
                    <div className="text-xs text-text-secondary">PTS</div>
                  </div>
                </div>
                
                <div className="flex justify-between text-xs text-text-secondary">
                  <span>10 PTS</span>
                  <span>250 PTS</span>
                  <span>500 PTS</span>
                </div>
              </div>
            </div>

            {/* Potential Returns */}
            {selectedOutcome && (
              <div className="p-4 bg-card rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-text-secondary">Potential Return</div>
                    <div className="text-xl font-bold text-green-400">
                      {Math.round(stake * (
                        selectedOutcome === 'Home Win' ? matchData.homeOdds :
                        selectedOutcome === 'Draw' ? matchData.drawOdds :
                        matchData.awayOdds
                      ))} PTS
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-text-secondary">Profit</div>
                    <div className="text-lg font-bold text-primary">
                      +{Math.round(stake * (
                        selectedOutcome === 'Home Win' ? matchData.homeOdds - 1 :
                        selectedOutcome === 'Draw' ? matchData.drawOdds - 1 :
                        matchData.awayOdds - 1
                      ))} PTS
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Predict Button */}
            <button
              onClick={handlePredict}
              disabled={!selectedOutcome || stake > points || predicting}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                !selectedOutcome || stake > points
                  ? 'bg-card text-text-secondary cursor-not-allowed'
                  : 'bg-gradient-to-r from-primary to-green-500 text-white hover:opacity-90'
              }`}
            >
              {predicting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                `Predict ${selectedOutcome ? `(${stake} PTS)` : ''}`
              )}
            </button>
          </div>
        </div>
      )}

      {/* Quick Actions (if compact) */}
      {compact && (
        <div className="flex items-center justify-between pt-4 border-t border-card">
          <button className="text-primary hover:text-primary/80 text-sm font-medium flex items-center space-x-1">
            <BarChart3 size={16} />
            <span>View Stats</span>
          </button>
          <button className="flex items-center space-x-1 text-text-secondary hover:text-white text-sm">
            <span>Predict</span>
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </motion.div>
  )
}

export default MatchCard