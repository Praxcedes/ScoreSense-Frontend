import React from 'react'
import { motion } from 'framer-motion'
import { Trophy, TrendingUp, Users, Award } from 'lucide-react'
import StatCard from '../../components/common/StatCard'
import LineChart from '../../components/charts/LineChart'
import { usePoints } from '../../hooks/usePoints'

const Dashboard = () => {
  const { points } = usePoints()

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
      title: 'Active Users',
      value: '1.2K',
      change: '+5%',
      icon: <Users className="text-blue-400" size={24} />,
      color: 'blue'
    },
    {
      title: 'Global Rank',
      value: '#42',
      change: '↑ 5',
      icon: <Award className="text-purple-400" size={24} />,
      color: 'purple'
    }
  ]

  const chartData = {
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
        className="bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl p-8 border border-primary/20"
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold">Performance Analytics</h2>
            <p className="text-text-secondary">Weekly points progression</p>
          </div>
        </div>
        <LineChart data={chartData} height={250} />
      </motion.div>

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