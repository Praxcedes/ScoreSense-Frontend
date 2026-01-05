import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Users, Target } from 'lucide-react'
import { usePoints } from '../../hooks/usePoints'
import { toast } from 'react-hot-toast'

const MatchCard = ({ match, compact = false, featured = false }) => {
  const { makePrediction, points } = usePoints()
  const [selectedPrediction, setSelectedPrediction] = useState(null)
  const [stake, setStake] = useState(50)
  const [predicting, setPredicting] = useState(false)

  const handlePredict = async () => {
    if (!selectedPrediction) {
      toast.error('Please select a prediction')
      return
    }

    if (stake > points) {
      toast.error('Insufficient points')
      return
    }

    setPredicting(true)
    const result = await makePrediction(match.id, selectedPrediction, stake)
    setPredicting(false)

    if (result.success) {
      toast.success('Prediction placed successfully!')
    } else {
      toast.error(result.error)
    }
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`match-card ${featured ? 'border-primary/50' : ''}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-card rounded-lg">
            <span className="text-xl">{match.sport === 'football' ? '⚽' : 
                                     match.sport === 'basketball' ? '🏀' : 
                                     match.sport === 'tennis' ? '🎾' : '🏆'}</span>
          </div>
          <div>
            <h3 className="font-bold">{match.league}</h3>
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <Calendar size={14} />
              <span>{match.date}</span>
              <MapPin size={14} />
              <span>{match.venue}</span>
            </div>
          </div>
        </div>
        {match.status === 'live' && (
          <div className="live-badge">LIVE</div>
        )}
      </div>

      {/* Teams */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="text-center flex-1">
            <div className="text-2xl font-bold">{match.homeTeam}</div>
            <div className="text-sm text-text-secondary mt-1">{match.homeRecord}</div>
          </div>
          <div className="px-4">
            <div className="text-center">
              <div className="text-3xl font-bold">VS</div>
              <div className="text-sm text-text-secondary mt-1">{match.time}</div>
            </div>
          </div>
          <div className="text-center flex-1">
            <div className="text-2xl font-bold">{match.awayTeam}</div>
            <div className="text-sm text-text-secondary mt-1">{match.awayRecord}</div>
          </div>
        </div>
      </div>

      {/* Prediction Options */}
      {!compact && (
        <>
          <div className="border-t border-card pt-4">
            <div className="flex space-x-2 mb-4">
              {['Home Win', 'Draw', 'Away Win'].map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedPrediction(option)}
                  className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                    selectedPrediction === option
                      ? 'bg-primary text-white'
                      : 'bg-card text-text-secondary hover:text-white'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-text-secondary">Stake Amount</span>
                  <span className="text-sm text-text-secondary">Balance: {points} PTS</span>
                </div>
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
                  <div className="w-20 text-center">
                    <div className="text-xl font-bold">{stake}</div>
                    <div className="text-xs text-text-secondary">PTS</div>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePredict}
                disabled={!selectedPrediction || stake > points || predicting}
                className={`w-full py-3 rounded-xl font-bold transition-all ${
                  !selectedPrediction || stake > points
                    ? 'bg-card text-text-secondary cursor-not-allowed'
                    : 'bg-primary text-white hover:bg-primary/90'
                }`}
              >
                {predicting ? 'Placing Prediction...' : `Predict (${stake} PTS)`}
              </button>
            </div>
          </div>
        </>
      )}
    </motion.div>
  )
}

export default MatchCard