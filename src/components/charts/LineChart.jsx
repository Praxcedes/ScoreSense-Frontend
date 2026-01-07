import React from 'react'
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area
} from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface border border-card rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-text-secondary">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm font-bold" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

const LineChart = ({ data, height = 200 }) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1A3329" />
        <XAxis 
          dataKey="label" 
          stroke="#94A3B8"
          fontSize={12}
        />
        <YAxis 
          stroke="#94A3B8"
          fontSize={12}
        />
        <Tooltip content={<CustomTooltip />} />
        {data.datasets.map((dataset, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey="value"
            data={dataset.data}
            name={dataset.label}
            stroke={dataset.borderColor}
            strokeWidth={2}
            dot={{ strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}

export default LineChart