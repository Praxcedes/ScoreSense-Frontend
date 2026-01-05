import React from 'react'
import { motion } from 'framer-motion'

const StatCard = ({ title, value, change, icon, color = 'primary' }) => {
  const colorClasses = {
    primary: 'text-primary',
    green: 'text-green-400',
    yellow: 'text-yellow-400',
    blue: 'text-blue-400',
    purple: 'text-purple-400',
    red: 'text-red-400'
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 ${colorClasses[color].replace('text', 'bg')}/20 rounded-xl`}>
          {icon}
        </div>
        <span className={`text-sm font-medium ${change?.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
          {change}
        </span>
      </div>
      <h3 className="text-3xl font-bold">{value}</h3>
      <p className="text-text-secondary text-sm mt-1">{title}</p>
    </motion.div>
  )
}

export default StatCard