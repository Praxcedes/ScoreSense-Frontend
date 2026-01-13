import React, { useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Target, Trophy, BarChart3, Download } from 'lucide-react'
import StatCard from '../../components/common/StatCard'
import LineChart from '../../components/charts/LineChart'
import ProgressChart from '../../components/charts/ProgressChart'
import { statsService } from '../../services/stats.service'

const Stats = () => {
  const [timeRange, setTimeRange] = useState('30days')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [summary, setSummary] = useState(null)
  const [predictionStats, setPredictionStats] = useState(null)
  const [earnedTransactions, setEarnedTransactions] = useState([])
  const [spentTransactions, setSpentTransactions] = useState([])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        setError(null)

        const [summaryResponse, predictionsResponse, earnedResponse, spentResponse] = await Promise.all([
          statsService.getSummary(),
          statsService.getPredictions(),
          statsService.getTransactions({ type: 'earned', per_page: 100 }),
          statsService.getTransactions({ type: 'spent', per_page: 100 })
        ])

        setSummary(summaryResponse?.summary || null)
        setPredictionStats(predictionsResponse?.stats || null)
        setEarnedTransactions(earnedResponse?.transactions || [])
        setSpentTransactions(spentResponse?.transactions || [])
      } catch (fetchError) {
        const message = fetchError?.error || fetchError?.message || 'Failed to load stats.'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const totalPredictions = predictionStats?.total_predictions || 0
  const winRate = predictionStats?.win_rate || 0
  const streak = summary?.streak || 0
  const pointsBalance = summary?.points || 0

  const earnedTotal = earnedTransactions.reduce((sum, tx) => sum + (tx.amount > 0 ? tx.amount : 0), 0)
  const spentTotal = spentTransactions.reduce(
    (sum, tx) => sum + (tx.amount < 0 ? Math.abs(tx.amount) : tx.amount),
    0
  )
  const netProfit = earnedTotal - spentTotal

  const stats = [
    {
      title: 'Total Predictions',
      value: totalPredictions.toLocaleString(),
      change: `${predictionStats?.success_rate ? `${predictionStats.success_rate.toFixed(1)}%` : ''}`,
      icon: <BarChart3 className="text-blue-400" size={24} />,
      color: 'blue'
    },
    {
      title: 'Win Rate',
      value: `${winRate.toFixed(1)}%`,
      change: `${predictionStats?.won_predictions || 0} won`,
      icon: <TrendingUp className="text-green-400" size={24} />,
      color: 'green'
    },
    {
      title: 'Total Profit',
      value: `${netProfit >= 0 ? '+' : '-'}${Math.abs(netProfit).toLocaleString()} PTS`,
      change: `${earnedTotal.toLocaleString()} earned`,
      icon: <Trophy className="text-yellow-400" size={24} />,
      color: 'yellow'
    },
    {
      title: 'Best Streak',
      value: `${streak} wins`,
      change: 'Record',
      icon: <Target className="text-purple-400" size={24} />,
      color: 'purple'
    }
  ]

  const filteredEarned = useMemo(() => {
    const rangeDays = timeRange === '7days' ? 7 : timeRange === '90days' ? 90 : 30
    const cutoff = new Date()
    cutoff.setDate(cutoff.getDate() - rangeDays)
    return earnedTransactions.filter((tx) => {
      if (!tx.created_at) return false
      return new Date(tx.created_at) >= cutoff
    })
  }, [earnedTransactions, timeRange])

  const performanceData = useMemo(() => {
    const buckets = {}
    filteredEarned.forEach((tx) => {
      const dateKey = tx.created_at?.slice(0, 10)
      if (!dateKey) return
      buckets[dateKey] = (buckets[dateKey] || 0) + (tx.amount > 0 ? tx.amount : 0)
    })

    const labels = Object.keys(buckets).sort()
    const values = labels.map((label) => buckets[label])

    return {
      labels: labels.length ? labels : ['No data'],
      datasets: [
        {
          label: 'Points Earned',
          data: values.length ? values : [0],
          borderColor: '#22C55E',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          fill: true
        }
      ]
    }
  }, [filteredEarned])

  const progressGoals = [
    {
      label: 'Monthly Predictions',
      value: `${totalPredictions}/50`,
      progress: Math.min((totalPredictions / 50) * 100, 100)
    },
    {
      label: 'Win Rate Target',
      value: `${winRate.toFixed(1)}%/70%`,
      progress: Math.min((winRate / 70) * 100, 100)
    },
    {
      label: 'Points Goal',
      value: `${pointsBalance.toLocaleString()}/5,000`,
      progress: Math.min((pointsBalance / 5000) * 100, 100)
    }
  ]

  const sportPerformance = [
    {
      sport: 'All Sports',
      accuracy: Math.round(winRate),
      points: Math.round(netProfit)
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Stats & Analytics</h1>
          <p className="text-text-secondary mt-2">
            Deep dive into your prediction performance and statistics
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            {['7days', '30days', '90days'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  timeRange === range
                    ? 'bg-primary text-white'
                    : 'bg-card text-text-secondary hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <button className="btn-secondary flex items-center space-x-2">
            <Download size={18} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      {error && (
        <div className="card p-4 text-red-400 border border-red-500/30 bg-red-500/10">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Performance Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">Performance Trend</h2>
                <p className="text-text-secondary">Points earned over time</p>
              </div>
            </div>
            <LineChart data={performanceData} height={300} />
          </motion.div>
        </div>

        {/* Progress Goals */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card p-6"
          >
            <h2 className="text-xl font-bold mb-6">Progress Goals</h2>
            <div className="space-y-6">
              {progressGoals.map((goal) => (
                <div key={goal.label}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{goal.label}</span>
                    <span className="text-primary font-bold">{goal.value}</span>
                  </div>
                  <ProgressChart progress={goal.progress} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Sport Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <h2 className="text-xl font-bold mb-6">Sport Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          {sportPerformance.map((item, index) => (
            <div key={index} className="bg-card p-4 rounded-xl">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{item.accuracy}%</div>
                <div className="text-sm text-text-secondary mt-1">{item.sport}</div>
                <div className="text-sm font-medium mt-2">{item.points} PTS</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Stats
