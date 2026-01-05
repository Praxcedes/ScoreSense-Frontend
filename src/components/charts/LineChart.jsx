import React from 'react'
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts'
import { TrendingUp, TrendingDown } from 'lucide-react'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface border border-card rounded-xl p-4 shadow-2xl">
        <p className="text-sm font-medium text-text-secondary mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-text-secondary">{entry.name}:</span>
            </div>
            <span className="font-bold" style={{ color: entry.color }}>
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

const CustomizedDot = (props) => {
  const { cx, cy, stroke, payload } = props
  return (
    <circle
      cx={cx}
      cy={cy}
      r={6}
      stroke={stroke}
      strokeWidth={2}
      fill="#0F2A20"
      className="transition-all hover:r-8"
    />
  )
}

const LineChart = ({ data, height = 250, showGrid = true, showTooltip = true }) => {
  // Transform data for Recharts
  const chartData = data.labels.map((label, index) => {
    const point = { name: label }
    data.datasets.forEach((dataset, i) => {
      point[dataset.label] = dataset.data[index]
    })
    return point
  })

  const colors = ['#22C55E', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444']

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          {showGrid && (
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#1A3329" 
              vertical={false}
            />
          )}
          <XAxis 
            dataKey="name" 
            stroke="#64748B"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="#64748B"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          {showTooltip && <Tooltip content={<CustomTooltip />} />}
          
          {data.datasets.map((dataset, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={dataset.label}
              stroke={colors[index % colors.length]}
              strokeWidth={3}
              dot={<CustomizedDot />}
              activeDot={{ r: 8, strokeWidth: 2 }}
              animationDuration={1000}
              animationEasing="ease-out"
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
      
      {/* Chart Summary */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-3">
          {data.datasets.slice(0, 3).map((dataset, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <span className="text-sm text-text-secondary">{dataset.label}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-1">
          <TrendingUp className="text-green-400" size={16} />
          <span className="text-sm font-medium text-green-400">+12.5%</span>
        </div>
      </div>
    </div>
  )
}

export default LineChart