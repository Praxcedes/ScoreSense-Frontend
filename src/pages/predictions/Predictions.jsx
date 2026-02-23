import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Target,
  TrendingUp,
  Trophy,
  BarChart3,
  Filter,
  Search,
  Zap
} from 'lucide-react'
import { usePoints } from '../../hooks/usePoints'
import PredictionCard from '../../components/predictions/PredictionCard'
import PredictionForm from '../../components/predictions/PredictionForm'

const normalizeMatchLabel = (p) => {
  const home = p?.home_team || p?.homeTeam || p?.raw?.home_team || p?.raw?.homeTeam
  const away = p?.away_team || p?.awayTeam || p?.raw?.away_team || p?.raw?.awayTeam

  const label =
    p?.match_name ||
    p?.match ||
    p?.matchLabel ||
    p?.raw?.match_name ||
    p?.raw?.match ||
    (home && away ? `${home} vs ${away}` : null)

  // Never return "Match #N/A" / "Match #..." ever.
  if (!label || String(label).toLowerCase().includes('match #')) return 'Match'
  if (String(label).toLowerCase().includes('n/a')) return 'Match'
  return String(label)
}

const toNumber = (v, fallback = 0) => {
  const n = Number(v)
  return Number.isFinite(n) ? n : fallback
}

const Predictions = () => {
  const { predictions = [], points } = usePoints()
  const [activeTab, setActiveTab] = useState('active')
  const [searchQuery, setSearchQuery] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [sportFilter, setSportFilter] = useState('all')
  const [sortBy, setSortBy] = useState('recent')

  const normalizedPredictions = useMemo(() => {
    return (Array.isArray(predictions) ? predictions : []).map((prediction) => {
      const rawStatus = prediction?.status || prediction?.prediction_status
      const status =
        rawStatus === 'correct' ? 'won' :
        rawStatus === 'incorrect' ? 'lost' :
        rawStatus || 'pending'

      const confidence = (prediction?.confidence ?? prediction?.confidence_score ?? prediction?.raw?.confidence ?? prediction?.raw?.confidence_score ?? 0)

      return {
        id: prediction?.id ?? prediction?.prediction_id ?? prediction?.match_id ?? `${Math.random()}`,
        match: normalizeMatchLabel(prediction),
        prediction: prediction?.prediction || prediction?.pick || prediction?.market || 'Prediction',
        odds: prediction?.odds ?? prediction?.odds_value ?? prediction?.odds_decimal ?? 1.0,
        stake: prediction?.amount ?? prediction?.stake_amount ?? prediction?.stake ?? prediction?.points_staked ?? 0,
        potential: prediction?.potential_payout ?? prediction?.potential_winnings ?? prediction?.potential ?? prediction?.payout ?? 0,
        status,
        confidence,
        created_at: prediction?.created_at || prediction?.placed_at || prediction?.timestamp || prediction?.raw?.created_at
      }
    })
  }, [predictions])

  const stats = useMemo(() => {
    const total = normalizedPredictions.length
    const won = normalizedPredictions.filter((item) => item.status === 'won').length
    const lost = normalizedPredictions.filter((item) => item.status === 'lost').length
    const winRate = total > 0 ? ((won / total) * 100).toFixed(1) : '0.0'
    const totalProfit = normalizedPredictions.reduce((sum, item) => {
      if (item.status !== 'won') return sum
      return sum + (toNumber(item.potential) - toNumber(item.stake))
    }, 0)

    return [
      {
        title: 'Total Predictions',
        value: total.toLocaleString(),
        change: total ? 'Live' : '0',
        icon: <Target className="text-primary" />,
        color: 'primary'
      },
      {
        title: 'Win Rate',
        value: `${winRate}%`,
        change: total ? 'Live' : '0%',
        icon: <TrendingUp className="text-green-400" />,
        color: 'green'
      },
      {
        title: 'Total Profit',
        value: `${Math.round(totalProfit).toLocaleString()} PTS`,
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

  const sortOptions = [
    { id: 'recent', name: 'Most Recent' },
    { id: 'stake', name: 'Highest Stake' },
    { id: 'potential', name: 'Highest Potential' },
    { id: 'odds', name: 'Best Odds' },
    { id: 'confidence', name: 'Highest Confidence' }
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
      const q = searchQuery.toLowerCase()
      list = list.filter((item) =>
        (item.match || '').toLowerCase().includes(q) || (item.prediction || '').toLowerCase().includes(q)
      )
    }

    if (sportFilter !== 'all') {
      // keep simple: if you later add sport field from backend, filter on that
      list = list
    }

    if (sortBy === 'stake') {
      list.sort((a, b) => toNumber(b.stake) - toNumber(a.stake))
    } else if (sortBy === 'potential') {
      list.sort((a, b) => toNumber(b.potential) - toNumber(a.potential))
    } else if (sortBy === 'odds') {
      list.sort((a, b) => toNumber(b.odds) - toNumber(a.odds))
    } else if (sortBy === 'confidence') {
      list.sort((a, b) => toNumber(b.confidence) - toNumber(a.confidence))
    } else {
      list.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
    }

    return list
  }, [activeTab, normalizedPredictions, searchQuery, sortBy, sportFilter])

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
            transition={{ delay: index * 0.06 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 ${
                stat.color === 'primary' ? 'bg-primary/20' :
                stat.color === 'green' ? 'bg-green-500/20' :
                stat.color === 'yellow' ? 'bg-yellow-500/20' :
                'bg-purple-500/20'
              } rounded-xl`}>
                {stat.icon}
              </div>
              <span className="text-sm font-medium text-text-secondary">{stat.change}</span>
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

          <div className="flex items-center space-x-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field"
            >
              {sortOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>{opt.name}</option>
              ))}
            </select>

            <select
              value={sportFilter}
              onChange={(e) => setSportFilter(e.target.value)}
              className="input-field"
            >
              <option value="all">All Sports</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
              activeTab === tab.id ? 'bg-primary text-white' : 'bg-card text-text-secondary hover:text-white'
            }`}
          >
            <span className="font-medium">{tab.name}</span>
            <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
              activeTab === tab.id ? 'bg-white/20' : 'bg-surface'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredPredictions.length > 0 ? (
          filteredPredictions.map((prediction, index) => (
            <PredictionCard key={prediction.id} prediction={prediction} index={index} />
          ))
        ) : (
          <div className="card p-10 text-center text-text-secondary">
            No predictions found.
          </div>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <PredictionForm onClose={() => setShowForm(false)} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default Predictions
