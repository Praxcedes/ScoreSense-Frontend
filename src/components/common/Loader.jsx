import React from 'react'
import { motion } from 'framer-motion'

const Loader = ({ size = 'medium', color = 'primary', text, fullScreen = false }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-16 h-16',
    xlarge: 'w-24 h-24'
  }

  const colorClasses = {
    primary: 'border-primary',
    white: 'border-white',
    green: 'border-green-500',
    blue: 'border-blue-500',
    purple: 'border-purple-500'
  }

  const spinner = (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`${sizeClasses[size]} border-4 ${colorClasses[color]} border-t-transparent rounded-full animate-spin`}
      />
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-text-secondary font-medium"
        >
          {text}
        </motion.p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {spinner}
      </div>
    )
  }

  return spinner
}

export default Loader