import React from 'react'

const Loader = ({ size = 'medium', color = 'primary' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-16 h-16'
  }

  const colorClasses = {
    primary: 'border-primary',
    white: 'border-white',
    green: 'border-green-500'
  }

  return (
    <div className={`${sizeClasses[size]} border-4 ${colorClasses[color]} border-t-transparent rounded-full animate-spin`}></div>
  )
}

export default Loader