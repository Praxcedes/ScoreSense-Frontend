import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Target,
  TrendingUp,
  Trophy,
  BarChart3,
  Filter,
  Search,
  Zap,
  Shield,
  Star
} from 'lucide-react'
import { usePoints } from '../../hooks/usePoints'
import PredictionCard from '../../components/predictions/PredictionCard'
import PredictionForm from '../../components/predictions/PredictionForm'

const Predictions = () => {
  const { predictions = [], points } = usePoints()
  const [activeTab, setActiveTab] = useState('active')
  const [searchQuery, setSearchQuery] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [sportFilter, setSportFilter] = useState('all')
  const [sortBy, setSortBy] = useState('recent')

  const normalizedPredictions = useMemo(() => {
    return predictions.map((prediction) => {
      const status =
        prediction.status === 'correct'
          ? 'won'
          : prediction.status === 'incorrect'
          ? 'lost'
          : prediction.status || 'pending'

      return {
        id: prediction.id,
        match: prediction.match_name || prediction.match || `Match #${prediction.match_id || 'N/A'}`,
        prediction: prediction.prediction || 'Prediction',
        odds: prediction.odds || prediction.odds_value || 1.0,
        stake: prediction.amount || prediction.stake_amount || 0,
        potential: prediction.potential_payout || prediction.potential_winnings || 0,
        status,
        confidence: prediction.confidence || 0,
        created_at: prediction.created_at
      }
    })
  }, [predictions])

  const stats = useMemo(() => {
    const total = normalizedPredictions.length
    const won = normalizedPredictions.filter((item) => item.status === 'won').length
    const lost = normalizedPredictions.filter((item) => item.status === 'lost').length
    const winRate = total > 0 ? ((won / total) * 100).toFixed(1) : '0'
    const totalProfit = normalizedPredictions.reduce((sum, item) => {
      if (item.status !== 'won') return sum
      return sum + (item.potential - item.stake)
    }, 0)

    return [
      {
        title: 'Total Predictions',
        value: total.toLocaleString(),
        change: total ? '+Active' : '0',
        icon: <Target className="text-primary" />,
        color: 'primary'
      },
      {
        title: 'Win Rate',
        value: `${winRate}%`,
        change: total ? '+Live' : '0%',
        icon: <TrendingUp className="text-green-400" />,
        color: 'green'
      },
      {
        title: 'Total Profit',
        value: `${totalProfit.toLocaleString()} PTS`,
        change: total ? 'Updated' : '0',
        icon: <Trophy className="text-yellow-400" />,
        color: 'yellow'
      },
      {
        title: 'Avg. Return',
        value: total ? `${Math.round((totalProfit / total) * 10) / 10} PTS` : '0 PTS',
        change: 'Live',
        icon: <BarChart3 className="text-purple-400" />,
        color: 'purple'
      }
    ]
  }, [normalizedPredictions])

  const tabs = useMemo(() => {
    const pendingCount = normalizedPredictions.filter((item) => item.status === 'pending').length
    const wonCount = normalizedPredictions.filter((item) => item.status === 'won').length
    const lostCount = normalizedPredictions.filter((item) => item.status === 'lost').length

    return [
      { id: 'active', name: 'Active', count: pendingCount },
      { id: 'pending', name: 'Pending', count: pendingCount },
      { id: 'won', name: 'Won', count: wonCount },
      { id: 'lost', name: 'Lost', count: lostCount },
      { id: 'all', name: 'All', count: normalizedPredictions.length }
    ]
  }, [normalizedPredictions])

  const sports = [
    { id: 'all', name: 'All Sports', icon: '🏆' },
    { id: 'football', name: 'Football', icon: '⚽' }
  ]

  const sortOptions = [
    { id: 'recent', name: 'Most Recent' },
    { id: 'stake', name: 'Highest Stake' },
    { id: 'potential', name: 'Highest Potential' },
    { id: 'odds', name: 'Best Odds' }
  ]

  const filteredPredictions = useMemo(() => {
    let list = [...normalizedPredictions]

    if (activeTab === 'active' || activeTab === 'pending') {
      list = list.filter((item) => item.status === 'pending')
    } else if (activeTab === 'won') {
      list = list.filter((item) => item.status === 'won')
    } else if (activeTab === 'lost') {
      list = list.filter((item) => item.status === 'lost')
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      list = list.filter((item) =>
        item.match.toLowerCase().includes(query) || item.prediction.toLowerCase().includes(query)
      )
    }

    if (sportFilter !== 'all') {
      list = list.filter((item) => item.match.toLowerCase().includes('fc') || item.match.toLowerCase().includes('vs'))
    }

    if (sortBy === 'stake') {
      list.sort((a, b) => b.stake - a.stake)
    } else if (sortBy === 'potential') {
      list.sort((a, b) => b.potential - a.potential)
    } else if (sortBy === 'odds') {
      list.sort((a, b) => b.odds - a.odds)
    } else {
      list.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
    }

    return list
  }, [activeTab, normalizedPredictions, searchQuery, sortBy, sportFilter])

  const quickPredictions = filteredPredictions.slice(0, 3)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Predictions</h1>
          <p className="text-text-secondary mt-2">
            Track your predictions, analyze performance, and make smarter bets
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Zap size={18} />
            <span>New Prediction</span>
          </button>
          <button className="btn-secondary">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="grid-dashboard">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 ${stat.color === 'primary' ? 'bg-primary/20' :
                                      stat.color === 'green' ? 'bg-green-500/20' :
                                      stat.color === 'yellow' ? 'bg-yellow-500/20' :
                                      'bg-purple-500/20'} rounded-xl`}>
                {stat.icon}
              </div>
              <span className="text-sm font-medium text-text-secondary">
                {stat.change}
              </span>
            </div>
            <h3 className="text-3xl font-bold">{stat.value}</h3>
            <p className="text-text-secondary text-sm mt-1">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      <div className="card p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={20} />
              <input
                type="text"
                placeholder="Search predictions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field w-full pl-10"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={sportFilter}
              onChange={(e) => setSportFilter(e.target.value)}
              className="input-field w-40"
            >
              {sports.map((sport) => (
                <option key={sport.id} value={sport.id}>
                  {sport.icon} {sport.name}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field w-40"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex space-x-1 bg-card p-1 rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-primary text-white'
                : 'text-text-secondary hover:text-white hover:bg-hover'
            }`}
          >
            <span>{tab.name}</span>
            {tab.count > 0 && (
              <span className={`px-2 py-0.5 text-xs rounded-full ${
                activeTab === tab.id
                  ? 'bg-white/20'
                  : 'bg-surface'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center space-x-2">
              <Zap size={20} className="text-yellow-400" />
              <span>Quick Predictions</span>
            </h3>
            {quickPredictions.length > 0 ? (
              quickPredictions.map((prediction, index) => (
                <PredictionCard key={prediction.id} prediction={prediction} index={index} />
              ))
            ) : (
              <div className="card p-6 text-center text-text-secondary">
                No quick predictions yet.
              </div>
            )}
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">All Predictions</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-text-secondary">Balance:</span>
                <span className="font-bold text-primary">{points} PTS</span>
              </div>
            </div>

            {filteredPredictions.length > 0 ? (
              <div className="space-y-4">
                {filteredPredictions.map((prediction, index) => (
                  <PredictionCard key={prediction.id} prediction={prediction} index={index} />
                ))}
              </div>
            ) : (
              <div className="card p-12 text-center">
                <Target className="mx-auto text-text-secondary" size={48} />
                <h3 className="text-xl font-bold mt-4">No predictions yet</h3>
                <p className="text-text-secondary mt-2">
                  Make your first prediction to start earning points!
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="btn-primary mt-6"
                >
                  Make First Prediction
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <AnimatePresence>
            {showForm && (
              <PredictionForm onClose={() => setShowForm(false)} />
            )}
          </AnimatePresence>

          <div className="card p-6">
            <h3 className="font-bold mb-4 flex items-center space-x-2">
              <BarChart3 size={20} />
              <span>Prediction Insights</span>
            </h3>
            <div className="space-y-4 text-sm text-text-secondary">
              <div className="flex items-center justify-between">
                <span>Best Sport</span>
                <span className="font-bold text-white">Football</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Best Market</span>
                <span className="font-bold text-white">Match Winner</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Avg. Odds</span>
                <span className="font-bold text-white">1.85</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Total Stake</span>
                <span className="font-bold text-white">{points} PTS</span>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="font-bold mb-4 flex items-center space-x-2">
              <Shield size={20} />
              <span>Risk Calculator</span>
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-text-secondary mb-2">
                  Stake Amount
                </label>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-text-secondary mt-1">
                  <span>10 PTS</span>
                  <span>250 PTS</span>
                  <span>500 PTS</span>
                </div>
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-2">
                  Odds
                </label>
                <input
                  type="number"
                  placeholder="1.85"
                  className="input-field w-full"
                />
              </div>
              <div className="p-4 bg-card rounded-xl">
                <div className="text-center">
                  <div className="text-sm text-text-secondary">Potential Return</div>
                  <div className="text-2xl font-bold text-green-400">92.5 PTS</div>
                  <div className="text-sm text-text-secondary mt-1">+42.5 PTS profit</div>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="font-bold mb-4 flex items-center space-x-2">
              <Star size={20} />
              <span>Pro Tips</span>
            </h3>
            <div className="space-y-3">
              {[
                'Analyze team form before betting',
                'Never stake more than 5% of balance',
                'Consider injury reports',
                'Check head-to-head statistics',
                'Look for value in underdogs'
              ].map((tip, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <span className="text-sm">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Predictions
