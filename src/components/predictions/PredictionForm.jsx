import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  X,
  Search,
  Target,
  DollarSign,
  BarChart3,
  Shield,
  TrendingUp,
  Calendar
} from 'lucide-react'
import { usePoints } from '../../hooks/usePoints'
import { toast } from 'react-hot-toast'

const PredictionForm = ({ onClose }) => {
  const { points, makePrediction } = usePoints()
  const [formData, setFormData] = useState({
    match: '',
    prediction: '',
    odds: 1.85,
    stake: 50,
    confidence: 75
  })
  const [step, setStep] = useState(1)

  const matches = [
    'Gor Mahia vs AFC Leopards',
    'Manchester City vs Arsenal',
    'Adesanya vs Du Plessis',
    'Liverpool vs Chelsea',
    'Barcelona vs Real Madrid'
  ]

  const predictions = [
    'Home Win',
    'Draw',
    'Away Win',
    'Over 2.5 Goals',
    'Under 2.5 Goals',
    'Both Teams to Score'
  ]

  const calculatePotential = () => {
    return Math.round(formData.stake * formData.odds)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.stake > points) {
      toast.error('Insufficient points')
      return
    }

    const result = await makePrediction(
      Date.now(),
      formData.prediction,
      formData.stake
    )

    if (result.success) {
      toast.success('Prediction placed successfully!')
      onClose()
    } else {
      toast.error(result.error)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-surface rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="p-6 border-b border-card">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Make a Prediction</h2>
              <p className="text-text-secondary mt-1">
                Step {step} of 3 • Balance: {points} PTS
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-hover rounded-lg"
            >
              <X size={24} />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mt-6">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= stepNum ? 'bg-primary text-white' : 'bg-card text-text-secondary'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={`w-24 h-1 mx-2 ${
                    step > stepNum ? 'bg-primary' : 'bg-card'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold">Select Match</h3>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Search Matches
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={20} />
                  <input
                    type="text"
                    value={formData.match}
                    onChange={(e) => setFormData({ ...formData, match: e.target.value })}
                    placeholder="Search for a match..."
                    className="input-field w-full pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-text-secondary">
                  Quick Select
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {matches.map((match) => (
                    <button
                      key={match}
                      type="button"
                      onClick={() => setFormData({ ...formData, match })}
                      className={`p-4 rounded-xl text-left transition-all ${
                        formData.match === match
                          ? 'bg-primary text-white'
                          : 'bg-card hover:bg-hover'
                      }`}
                    >
                      <div className="font-medium">{match}</div>
                      <div className="text-sm opacity-80">Today • 19:30 • Premier League</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold">Make Prediction</h3>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Selected Match
                </label>
                <div className="p-4 bg-card rounded-xl">
                  <div className="font-bold">{formData.match}</div>
                  <div className="text-sm text-text-secondary">Today • 19:30 • Premier League</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Prediction Type
                  </label>
                  <div className="space-y-2">
                    {predictions.slice(0, 3).map((pred) => (
                      <button
                        key={pred}
                        type="button"
                        onClick={() => setFormData({ ...formData, prediction: pred })}
                        className={`w-full p-3 rounded-lg text-left transition-all ${
                          formData.prediction === pred
                            ? 'bg-primary text-white'
                            : 'bg-card hover:bg-hover'
                        }`}
                      >
                        {pred}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Odds
                  </label>
                  <input
                    type="number"
                    min="1.01"
                    max="100"
                    step="0.01"
                    value={formData.odds}
                    onChange={(e) => setFormData({ ...formData, odds: parseFloat(e.target.value) })}
                    className="input-field w-full"
                  />
                  <div className="text-sm text-text-secondary mt-2">
                    Higher odds = Higher risk, Higher reward
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Confidence Level
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="50"
                    max="95"
                    step="5"
                    value={formData.confidence}
                    onChange={(e) => setFormData({ ...formData, confidence: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-text-secondary">
                    <span>50%</span>
                    <span className="font-bold text-primary">{formData.confidence}%</span>
                    <span>95%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold">Confirm & Stake</h3>
              
              {/* Summary */}
              <div className="bg-card rounded-xl p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-text-secondary">Match</div>
                    <div className="font-bold">{formData.match}</div>
                  </div>
                  <div>
                    <div className="text-sm text-text-secondary">Prediction</div>
                    <div className="font-bold text-primary">{formData.prediction}</div>
                  </div>
                  <div>
                    <div className="text-sm text-text-secondary">Odds</div>
                    <div className="font-bold">{formData.odds}</div>
                  </div>
                  <div>
                    <div className="text-sm text-text-secondary">Confidence</div>
                    <div className="font-bold">{formData.confidence}%</div>
                  </div>
                </div>
              </div>

              {/* Stake Control */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-medium text-text-secondary">
                    Stake Amount
                  </label>
                  <span className="text-sm text-text-secondary">
                    Balance: <span className="font-bold text-primary">{points} PTS</span>
                  </span>
                </div>
                
                <div className="space-y-4">
                  <input
                    type="range"
                    min="10"
                    max={Math.min(points, 500)}
                    step="10"
                    value={formData.stake}
                    onChange={(e) => setFormData({ ...formData, stake: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  
                  <div className="flex justify-between">
                    {[10, 50, 100, 250, 500].map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => setFormData({ ...formData, stake: amount })}
                        className={`px-4 py-2 rounded-lg ${
                          formData.stake === amount
                            ? 'bg-primary text-white'
                            : 'bg-card text-text-secondary hover:text-white'
                        }`}
                        disabled={amount > points}
                      >
                        {amount}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Potential Return */}
              <div className="bg-gradient-to-r from-green-900/20 to-green-500/10 border border-green-500/30 rounded-xl p-6">
                <div className="text-center">
                  <div className="text-sm text-text-secondary mb-2">Potential Return</div>
                  <div className="text-4xl font-bold text-green-400">
                    {calculatePotential()} PTS
                  </div>
                  <div className="text-lg text-primary mt-2">
                    +{calculatePotential() - formData.stake} PTS profit
                  </div>
                </div>
              </div>

              {/* Risk Warning */}
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                <div className="flex items-start space-x-3">
                  <Shield className="text-red-400 mt-0.5" size={20} />
                  <div>
                    <div className="font-medium text-red-400">Risk Warning</div>
                    <p className="text-sm text-text-secondary mt-1">
                      Predictions involve risk. Only stake what you can afford to lose.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-card">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="btn-secondary"
              >
                Back
              </button>
            ) : (
              <div></div>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="btn-primary"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                className="btn-primary"
              >
                Place Prediction ({formData.stake} PTS)
              </button>
            )}
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default PredictionForm