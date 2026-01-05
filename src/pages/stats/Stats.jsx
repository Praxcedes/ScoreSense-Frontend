import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  TrendingDown,
  Target,
  Award,
  BarChart3,
  PieChart,
  Calendar,
  Download,
  Filter
} from 'lucide-react'
import LineChart from '../../components/charts/LineChart'
import ProgressChart from '../../components/charts/ProgressChart'
import StatCard from '../../components/common/StatCard'

const Stats = () => {
  const [timeRange, setTimeRange] = useState('30days')
  const [activeView, setActiveView] = useState('overall')

  const stats = [
    {
      title: 'Total Predictions',
      value: '1,245',
      change: '+12%',
      icon: <BarChart3 className="text-blue-400" size={24} />,
      color: 'blue'
    },
    {
      title: 'Win Rate',
      value: '68.4%',
      change: '+2.5%',
      icon: <TrendingUp className="text-green-400" size={24} />,
      color: 'green'
    },
    {
      title: 'Avg. Return',
      value: '87.5 PTS',
      change: '+15%',
      icon: <Award className="text-yellow-400" size={24} />,
      color: 'yellow'
    },
    {
      title: 'Best Streak',
      value: '8 wins',
      change: 'Record',
      icon: <Target className="text-purple-400" size={24} />,
      color: 'purple'
    }
  ]

  const performanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Points Earned',
        data: [450, 520, 680, 810, 950, 1240],
        borderColor: '#22C55E',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true
      },
      {
        label: 'Predictions Made',
        data: [120, 150, 180, 220, 250, 310],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true
      }
    ]
  }

  const sportBreakdown = [
    { sport: 'Football', accuracy: 72, points: 1240 },
    { sport: 'Basketball', accuracy: 65, points: 850 },
    { sport: 'Tennis', accuracy: 58, points: 620 },
    { sport: 'MMA', accuracy: 81, points: 950 }
  ]

  const recentPredictions = [
    { date: 'Today', event: 'Man City vs Arsenal', pick: 'Man City Win', result: 'win', points: 120 },
    { date: 'Yesterday', event: 'Gor vs AFC', pick: 'Over 2.5 Goals', result: 'loss', points: -50 },
    { date: 'Jun 20', event: 'UFC 304', pick: 'Chimaev SUB', result: 'win', points: 150 },
    { date: 'Jun 19', event: 'Real vs Barca', pick: 'Both Teams Score', result: 'win', points: 80 }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Performance Analytics</h1>
          <p className="text-text-secondary mt-2">
            Deep dive into your prediction performance and statistics
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            {['7days', '30days', '90days', '1year'].map((range) => (
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
        {/* Performance Charts */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">Performance Trend</h2>
                <p className="text-text-secondary">Points earned vs predictions made</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-hover rounded-lg">
                  <Filter size={18} />
                </button>
              </div>
            </div>
            <LineChart data={performanceData} height={300} />
          </motion.div>
        </div>

        {/* Sport Breakdown */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Sport Breakdown</h2>
              <PieChart className="text-text-secondary" size={20} />
            </div>
            <div className="space-y-4">
              {sportBreakdown.map((sport, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{sport.sport}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-text-secondary">{sport.accuracy}%</span>
                      <span className="font-bold">{sport.points} PTS</span>
                    </div>
                  </div>
                  <div className="w-full bg-card rounded-full h-2">
                    <div
                      className="h-2 bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${sport.accuracy}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Performance */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6"
          >
            <h2 className="text-xl font-bold mb-6">Recent Predictions</h2>
            <div className="space-y-4">
              {recentPredictions.map((pred, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 hover:bg-hover rounded-xl transition-colors"
                >
                  <div>
                    <p className="font-medium">{pred.event}</p>
                    <p className="text-sm text-text-secondary">{pred.date} • {pred.pick}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                      pred.result === 'win' ? 'status-win' : 'status-loss'
                    }`}>
                      {pred.result}
                    </span>
                    <p className={`text-sm font-bold mt-1 ${
                      pred.points > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {pred.points > 0 ? '+' : ''}{pred.points} PTS
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Progress Goals */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6"
          >
            <h2 className="text-xl font-bold mb-6">Progress Goals</h2>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Monthly Predictions</span>
                  <span className="text-primary font-bold">24/50</span>
                </div>
                <ProgressChart progress={48} />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Win Rate Target</span>
                  <span className="text-primary font-bold">68.4%/70%</span>
                </div>
                <ProgressChart progress={97.7} />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Points Goal</span>
                  <span className="text-primary font-bold">2,450/5,000</span>
                </div>
                <ProgressChart progress={49} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Stats