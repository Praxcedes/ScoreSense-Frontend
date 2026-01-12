import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Target, Trophy, BarChart3, Download } from 'lucide-react'
import StatCard from '../../components/common/StatCard'
import LineChart from '../../components/charts/LineChart'
import ProgressChart from '../../components/charts/ProgressChart'

const Stats = () => {
  const [timeRange, setTimeRange] = useState('30days')

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
      title: 'Total Profit',
      value: '+2,450 PTS',
      change: '+15%',
      icon: <Trophy className="text-yellow-400" size={24} />,
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
      }
    ]
  }

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

      {/* Sport Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <h2 className="text-xl font-bold mb-6">Sport Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          {[
            { sport: "Football", accuracy: 72, points: 1240 },
          ].map((item, index) => (
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