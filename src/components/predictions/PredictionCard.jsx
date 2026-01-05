import React from 'react'
import { motion } from 'framer-motion'
import {
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Target,
  DollarSign,
  BarChart3
} from 'lucide-react'

const PredictionCard = ({ prediction, index }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'won': return 'text-green-400 bg-green-500/20 border-green-500/30'
      case 'lost': return 'text-red-400 bg-red-500/20 border-red-500/30'
      case 'pending': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30'
      default: return 'text-blue-400 bg-blue-500/20 border-blue-500/30'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'won': return <CheckCircle size={16} />
      case 'lost': return <XCircle size={16} />
      case 'pending': return <Clock size={16} />
      default: return <Target size={16} />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="card p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h4 className="font-bold text-lg">{prediction.match}</h4>
          <div className="flex items-center space-x-4 mt-2">
            <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-lg ${getStatusColor(prediction.status)}`}>
              {getStatusIcon(prediction.status)}
              <span className="font-medium">{prediction.status.toUpperCase()}</span>
            </span>
            <span className="text-text-secondary flex items-center space-x-1">
              <BarChart3 size={14} />
              <span>{prediction.confidence}% confidence</span>
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">{prediction.odds}</div>
          <div className="text-sm text-text-secondary">Odds</div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card p-4 rounded-xl">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="text-text-secondary" size={16} />
            <span className="text-sm text-text-secondary">Prediction</span>
          </div>
          <div className="font-bold">{prediction.prediction}</div>
        </div>

        <div className="bg-card p-4 rounded-xl">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="text-text-secondary" size={16} />
            <span className="text-sm text-text-secondary">Stake</span>
          </div>
          <div className="font-bold text-primary">{prediction.stake} PTS</div>
        </div>

        <div className="bg-card p-4 rounded-xl">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="text-text-secondary" size={16} />
            <span className="text-sm text-text-secondary">Potential</span>
          </div>
          <div className="font-bold text-green-400">{prediction.potential} PTS</div>
        </div>

        <div className="bg-card p-4 rounded-xl">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="text-text-secondary" size={16} />
            <span className="text-sm text-text-secondary">
              {prediction.timeLeft ? 'Time Left' : 'Result'}
            </span>
          </div>
          <div className={`font-bold ${
            prediction.result?.startsWith('+') ? 'text-green-400' : 'text-red-400'
          }`}>
            {prediction.timeLeft || prediction.result}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6 pt-6 border-t border-card">
        <div className="flex items-center space-x-4">
          <div className="text-sm text-text-secondary">
            Placed: Today at 14:30
          </div>
          <div className="text-sm text-text-secondary">
            ID: #{prediction.id.toString().padStart(6, '0')}
          </div>
        </div>
        <button className="text-primary hover:text-primary/80 text-sm font-medium">
          View Details →
        </button>
      </div>
    </motion.div>
  )
}

export default PredictionCard