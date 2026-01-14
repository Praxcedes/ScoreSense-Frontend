import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Target,
  TrendingUp,
  Trophy,
  BarChart3,
  Clock,
  Filter,
  Search,
  Zap,
  Shield,
  DollarSign,
  TrendingDown,
  CheckCircle,
  XCircle,
  Calendar,
  Hash,
  Award,
  Star
} from 'lucide-react'
import { usePoints } from '../../hooks/usePoints'
import { useMatches } from '../../hooks/useMatches'
import PredictionCard from '../../components/predictions/PredictionCard'
import PredictionForm from '../../components/predictions/PredictionForm'
import Loader from '../../components/common/Loader'

const Predictions = () => {
  const { predictions, predictionsStats, points } = usePoints()
  const { liveMatches = [], upcomingMatches = [] } = useMatches() || {}
  const [activeTab, setActiveTab] = useState('active')
  const [searchQuery, setSearchQuery] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [sportFilter, setSportFilter] = useState('all')
  const [sortBy, setSortBy] = useState('recent')

  const statusCounts = (predictions || []).reduce((acc, prediction) => {
    const status = (prediction?.status || 'pending').toLowerCase()
    acc[status] = (acc[status] || 0) + 1
    return acc
  }, {})

  const totalPredictions = predictionsStats?.total_predictions ?? (predictions?.length || 0)
  const activePredictions = predictionsStats?.active_predictions ?? statusCounts.active ?? 0
  const wonPredictions = predictionsStats?.won_predictions ?? statusCounts.won ?? 0
  const lostPredictions = predictionsStats?.lost_predictions ?? statusCounts.lost ?? 0
  const pendingPredictions = statusCounts.pending ?? 0
  const winRate = Number.isFinite(predictionsStats?.win_rate)
    ? `${predictionsStats.win_rate.toFixed(1)}%`
    : '0%'

  const tabs = [
    { id: 'active', name: 'Active', count: activePredictions },
    { id: 'pending', name: 'Pending', count: pendingPredictions },
    { id: 'won', name: 'Won', count: wonPredictions },
    { id: 'lost', name: 'Lost', count: lostPredictions },
    { id: 'all', name: 'All', count: totalPredictions }
  ]

  const sports = [
    { id: "all", name: "All Sports", icon: "🏆" },
    { id: "football", name: "Football", icon: "⚽" }
  ]

  const sortOptions = [
    { id: 'recent', name: 'Most Recent' },
    { id: 'stake', name: 'Highest Stake' },
    { id: 'potential', name: 'Highest Potential' },
    { id: 'odds', name: 'Best Odds' }
  ]

  const stats = [
    {
      title: 'Total Predictions',
      value: totalPredictions.toLocaleString(),
      change: null,
      icon: <Target className="text-primary" />,
      color: 'primary'
    },
    {
      title: 'Win Rate',
      value: winRate,
      change: null,
      icon: <TrendingUp className="text-green-400" />,
      color: 'green'
    },
    {
      title: 'Won Predictions',
      value: wonPredictions.toLocaleString(),
      change: null,
      icon: <Trophy className="text-yellow-400" />,
      color: 'yellow'
    },
    {
      title: 'Lost Predictions',
      value: lostPredictions.toLocaleString(),
      change: null,
      icon: <BarChart3 className="text-purple-400" />,
      color: 'purple'
    }
  ]
  const quickPredictions = (predictions || []).slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Header */}
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

      {/* Stats Overview */}
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
              {stat.change && (
                <span className={`text-sm font-medium ${
                  stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.change}
                </span>
              )}
            </div>
            <h3 className="text-3xl font-bold">{stat.value}</h3>
            <p className="text-text-secondary text-sm mt-1">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Search and Filters */}
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

      {/* Tabs */}
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

      {/* Quick Predictions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center space-x-2">
              <Zap size={20} className="text-yellow-400" />
              <span>Quick Predictions</span>
            </h3>
            {quickPredictions.length > 0 ? (
              quickPredictions.map((prediction, index) => (
                <PredictionCard key={prediction.id || index} prediction={prediction} index={index} />
              ))
            ) : (
              <div className="card p-6 text-center text-text-secondary">
                No recent predictions yet.
              </div>
            )}
          </div>

          {/* All Predictions */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">All Predictions</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-text-secondary">Balance:</span>
                <span className="font-bold text-primary">{points} PTS</span>
              </div>
            </div>
            
            {predictions && predictions.length > 0 ? (
              <div className="space-y-4">
                {predictions.slice(0, 10).map((prediction, index) => (
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

        {/* Right Column - Insights & Tools */}
        <div className="space-y-6">
          {/* Prediction Form Modal */}
          <AnimatePresence>
            {showForm && (
              <PredictionForm
                onClose={() => setShowForm(false)}
                matches={[...liveMatches, ...upcomingMatches]}
                allowLive
              />
            )}
          </AnimatePresence>

          {/* Insights */}
          <div className="card p-6">
            <h3 className="font-bold mb-4 flex items-center space-x-2">
              <BarChart3 size={20} />
              <span>Prediction Insights</span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Best Sport</span>
                <span className="font-bold">Football (72%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Best Market</span>
                <span className="font-bold">Match Winner (65%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Avg. Odds</span>
                <span className="font-bold">1.85</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Total Stake</span>
                <span className="font-bold">5,240 PTS</span>
              </div>
            </div>
          </div>

          {/* Risk Calculator */}
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

          {/* Tips */}
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

      {/* Prediction History Chart */}
      <div className="card p-6 mt-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold">Prediction Performance</h3>
            <p className="text-text-secondary">30-day win/loss trend</p>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="text-green-400" size={20} />
            <span className="text-green-400 font-bold">+15.3% this month</span>
          </div>
        </div>
        {/* Chart would go here */}
        <div className="h-64 bg-card rounded-xl flex items-center justify-center">
          <BarChart3 className="text-text-secondary" size={48} />
          <p className="text-text-secondary ml-4">Performance chart coming soon</p>
        </div>
      </div>
    </div>
  )
}

export default Predictions
