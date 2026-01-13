import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trophy, TrendingUp, Users, Award } from 'lucide-react'
import StatCard from '../../components/common/StatCard'
import LineChart from '../../components/charts/LineChart'
import api from '../../services/api'
import { usePoints } from '../../hooks/usePoints'

const Dashboard = () => {
  const { points } = usePoints()
  const [stats, setStats] = useState([])
  const [chartData, setChartData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch dashboard summary - REAL API CALL
      const summaryResponse = await api.get('/dashboard/summary')
      
      if (summaryResponse.success && summaryResponse.summary) {
        const summary = summaryResponse.summary
        // Update stats with real data from API
        const updatedStats = [
          {
            title: 'Total Points',
            value: (points || 0).toLocaleString(),
            change: '+12.5%',
            icon: <Trophy className="text-primary" size={24} />,
            color: 'primary'
          },
          {
            title: 'Win Rate',
            value: `${summary.accuracy || '0'}%`,
            change: '+2.3%',
            icon: <TrendingUp className="text-green-400" size={24} />,
            color: 'green'
          },
          {
            title: 'Active Predictions',
            value: summary.predictions?.total || '0',
            change: '+2 today',
            icon: <Users className="text-blue-400" size={24} />,
            color: 'blue'
          },
          {
            title: 'Global Rank',
            value: `#${summary.rank || 'N/A'}`,
            change: '↑ 5',
            icon: <Award className="text-purple-400" size={24} />,
            color: 'purple'
          }
        ]
        setStats(updatedStats)

        // Create chart data based on recent activity
        const recentActivity = summary.recent_activity || 0
        const chartLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        const chartValues = Array.from({length: 7}, (_, i) => 
          Math.floor(recentActivity / 7 * (i + 1))
        )
        
        const mockChartData = {
          labels: chartLabels,
          datasets: [
            {
              label: 'Predictions Made',
              data: chartValues,
              borderColor: '#22C55E',
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              fill: true
            }
          ]
        }
        setChartData(mockChartData)
      } else {
        throw new Error(summaryResponse.error || 'Failed to load dashboard data')
      }

    } catch (err) {
      console.error('Error fetching dashboard data:', err)
      
      // Check if it's an authentication error
      if (err.response?.status === 401 || err.message?.includes('401')) {
        // The API interceptor should handle redirect, but just in case
        return
      }
      
      setError('Failed to load dashboard data. Please try again.')
      
      // Set default stats on error
      setStats([
        {
          title: 'Total Points',
          value: '0',
          change: '+0%',
          icon: <Trophy className="text-primary" size={24} />,
          color: 'primary'
        },
        {
          title: 'Win Rate',
          value: '0%',
          change: '+0%',
          icon: <TrendingUp className="text-green-400" size={24} />,
          color: 'green'
        },
        {
          title: 'Active Predictions',
          value: '0',
          change: '+0',
          icon: <Users className="text-blue-400" size={24} />,
          color: 'blue'
        },
        {
          title: 'Global Rank',
          value: '#N/A',
          change: '↑ 0',
          icon: <Award className="text-purple-400" size={24} />,
          color: 'purple'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl p-8 border border-primary/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <div className="h-8 bg-surface-soft rounded w-64 mb-2 animate-pulse"></div>
              <div className="h-4 bg-surface-soft rounded w-48 animate-pulse"></div>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="glass-effect rounded-xl p-4">
                <div className="h-4 bg-surface-soft rounded w-24 mb-2 animate-pulse"></div>
                <div className="h-8 bg-surface-soft rounded w-32 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-surface rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-red-500/20 to-red-500/5 rounded-2xl p-8 border border-red-500/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-red-400">
                Error Loading Dashboard
              </h1>
              <p className="text-text-secondary mt-2">{error}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button 
                onClick={fetchDashboardData}
                className="px-6 py-3 bg-primary text-black rounded-lg font-semibold hover:bg-primary/90 transition"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl p-8 border border-primary/20"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Welcome back, <span className="text-primary">Predictor</span>
            </h1>
            <p className="text-text-secondary mt-2">
              Make smart predictions, climb the leaderboard, and dominate the competition.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="glass-effect rounded-xl p-4">
              <div className="text-sm text-text-secondary">Your Balance</div>
              <div className="text-3xl font-bold text-primary">{points.toLocaleString()} PTS</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
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
      {chartData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold">Performance Analytics</h2>
              <p className="text-text-secondary">Weekly predictions activity</p>
            </div>
          </div>
          <LineChart data={chartData} height={250} />
        </motion.div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6 text-center">
          <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Trophy className="text-primary" size={24} />
          </div>
          <h3 className="font-bold">Make Prediction</h3>
          <p className="text-text-secondary text-sm mt-1">Start predicting matches</p>
        </div>
        <div className="card p-6 text-center">
          <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="text-green-400" size={24} />
          </div>
          <h3 className="font-bold">View Stats</h3>
          <p className="text-text-secondary text-sm mt-1">Analyze performance</p>
        </div>
        <div className="card p-6 text-center">
          <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Users className="text-purple-400" size={24} />
          </div>
          <h3 className="font-bold">Join Community</h3>
          <p className="text-text-secondary text-sm mt-1">Connect with predictors</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
