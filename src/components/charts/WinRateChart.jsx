import React from 'react'
import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { Target, Trophy, TrendingUp } from 'lucide-react'

const WinRateChart = ({ data = null }) => {
  // Default data if none provided
  const defaultData = [
    { name: 'Wins', value: 68.4, color: '#22C55E' },
    { name: 'Losses', value: 21.3, color: '#EF4444' },
    { name: 'Draws', value: 10.3, color: '#F59E0B' }
  ]

  const chartData = data || defaultData

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-card rounded-xl p-3 shadow-lg">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-lg font-bold" style={{ color: payload[0].color }}>
            {payload[0].value}%
          </p>
        </div>
      )
    }
    return null
  }

  const CustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-xs font-bold"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">Win Rate Distribution</h3>
        <Target className="text-text-secondary" size={20} />
      </div>

      <div className="relative">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={CustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              animationDuration={1000}
              animationEasing="ease-out"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2">
        {chartData.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-card rounded-xl hover:bg-hover transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="font-medium">{item.name}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="font-bold">{item.value}%</span>
              {item.name === 'Wins' && (
                <div className="flex items-center space-x-1">
                  <TrendingUp size={14} className="text-green-400" />
                  <span className="text-xs text-green-400">+2.3%</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Overall Performance */}
      <div className="pt-4 border-t border-card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-secondary">Overall Performance</p>
            <p className="text-2xl font-bold text-primary">68.4%</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-text-secondary">Rank</p>
            <p className="text-2xl font-bold">#42</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WinRateChart