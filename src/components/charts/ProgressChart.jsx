import React from 'react'
import { motion } from 'framer-motion'

const ProgressChart = ({ progress, color = 'primary', height = 12, label, showPercentage = true }) => {
  const colorClasses = {
    primary: 'bg-primary',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    red: 'bg-red-500'
  }

  const textColorClasses = {
    primary: 'text-primary',
    green: 'text-green-400',
    yellow: 'text-yellow-400',
    blue: 'text-blue-400',
    purple: 'text-purple-400',
    red: 'text-red-400'
  }

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-text-secondary">{label}</span>
          {showPercentage && (
            <span className={`text-sm font-bold ${textColorClasses[color]}`}>
              {Math.round(progress)}%
            </span>
          )}
        </div>
      )}
      <div className={`progress-bar h-${height}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`progress-fill ${colorClasses[color]}`}
        />
      </div>
    </div>
  )
}

export default ProgressChart