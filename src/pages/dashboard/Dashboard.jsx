import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Trophy, 
  Users, 
  Target,
  Zap,
  Clock,
  Star,
  Award
} from 'lucide-react'
import { usePoints } from '../../hooks/usePoints'
import { useMatches } from '../../hooks/useMatches'
import StatCard from '../../components/common/StatCard'
import MatchCard from '../../components/matches/MatchCard'
import LineChart from '../../components/charts/LineChart'
import ProgressChart from '../../components/charts/ProgressChart'

const Dashboard = () => {
  const { points, leaderboard } = usePoints()
  const { liveMatches, upcomingMatches, featuredMatches } = useMatches()
  const [activeTab, setActiveTab] = useState('overview')

  const stats = [
    {
      title: 'Total Points',
      value: points.toLocaleString(),
      change: '+12.5%',
      icon: <Trophy className="text-primary" size={24} />,
      color: 'primary'
    },
    {
      title: 'Win Rate',
      value: '68.4%',
      change: '+2.3%',
      icon: <TrendingUp className="text-green-400" size={24} />,
      color: 'green'
    },
    {
      title: 'Active Streak',
      value: '5 days',
      change: '+3',
      icon: <Zap className="text-yellow-400" size={24} />,
      color: 'yellow'
    },
    {
      title: 'Global Rank',
      value: '#42',
      change: '↑ 5',
      icon: <Award className="text-purple-400" size={24} />,
      color: 'purple'
    }
  ]

  const performanceData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Points Earned',
        data: [120, 190, 300, 500, 200, 300, 450],
        borderColor: '#22C55E',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true
      }
    ]
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl p-6 md:p-8 border border-primary/20"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Welcome back, <span className="text-primary">Predictor</span>! 🎯
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
      <div className="grid-dashboard">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Performance Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">Performance Analytics</h2>
                <p className="text-text-secondary">Weekly points progression</p>
              </div>
              <div className="flex space-x-2">
                {['1W', '1M', '3M', '1Y'].map((period) => (
                  <button
                    key={period}
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      period === '1W'
                        ? 'bg-primary text-white'
                        : 'bg-card text-text-secondary hover:text-white'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
            <LineChart data={performanceData} height={250} />
          </motion.div>

          {/* Live Matches */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <h2 className="text-xl font-bold">Live Matches</h2>
              </div>
              <button className="text-primary hover:text-primary/80 text-sm font-medium">
                View All →
              </button>
            </div>
            <div className="space-y-4">
              {liveMatches.slice(0, 3).map((match) => (
                <MatchCard key={match.id} match={match} compact />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column - Leaderboard & Quick Stats */}
        <div className="space-y-6">
          {/* Leaderboard */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Top Predictors</h2>
              <Clock className="text-text-secondary" size={20} />
            </div>
            <div className="space-y-4">
              {leaderboard.slice(0, 5).map((user, index) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 hover:bg-hover rounded-xl transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      index === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                      index === 1 ? 'bg-gray-500/20 text-gray-400' :
                      index === 2 ? 'bg-orange-500/20 text-orange-400' :
                      'bg-card text-text-secondary'
                    }`}>
                      #{index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{user.username}</p>
                      <p className="text-sm text-text-secondary">{user.winRate}% win rate</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{user.points.toLocaleString()}</p>
                    <p className={`text-sm ${user.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {user.change >= 0 ? '↑' : '↓'} {Math.abs(user.change)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Predict */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-primary to-green-400 rounded-2xl p-6"
          >
            <div className="text-center">
              <Target className="mx-auto text-white" size={32} />
              <h3 className="text-lg font-bold mt-4">Quick Predict</h3>
              <p className="text-white/80 mt-2">Fast predictions with high returns</p>
              <button className="btn-primary mt-4 w-full bg-white text-primary hover:bg-gray-100">
                Try Quick Predict
              </button>
            </div>
          </motion.div>

          {/* Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6"
          >
            <h3 className="font-bold mb-4">Weekly Progress</h3>
            <ProgressChart progress={75} />
            <div className="flex items-center justify-between mt-4 text-sm text-text-secondary">
              <span>Goal: 100 predictions</span>
              <span>75% complete</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard