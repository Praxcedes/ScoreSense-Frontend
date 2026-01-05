import React from 'react'
import { motion } from 'framer-motion'
import { Crown, Check } from 'lucide-react'

const Avatar = ({ 
  src, 
  alt, 
  size = 'medium', 
  badge = null,
  online = false,
  premium = false,
  verified = false,
  onClick 
}) => {
  const sizeClasses = {
    xsmall: 'w-6 h-6 text-xs',
    small: 'w-8 h-8 text-sm',
    medium: 'w-12 h-12 text-base',
    large: 'w-16 h-16 text-lg',
    xlarge: 'w-24 h-24 text-2xl'
  }

  const badgeSizeClasses = {
    xsmall: 'w-1.5 h-1.5',
    small: 'w-2 h-2',
    medium: 'w-2.5 h-2.5',
    large: 'w-3 h-3',
    xlarge: 'w-4 h-4'
  }

  const badgePosition = {
    xsmall: 'bottom-0 right-0',
    small: 'bottom-0 right-0',
    medium: 'bottom-0 right-0',
    large: 'bottom-1 right-1',
    xlarge: 'bottom-2 right-2'
  }

  const getInitials = (name) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const avatarContent = src ? (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover rounded-full"
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center font-bold bg-gradient-to-br from-primary to-green-400 text-white">
      {getInitials(alt)}
    </div>
  )

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative ${sizeClasses[size]} rounded-full cursor-pointer ${onClick ? 'hover:opacity-90' : ''}`}
      onClick={onClick}
    >
      {avatarContent}

      {/* Online Status */}
      {online && (
        <div 
          className={`absolute ${badgePosition[size]} ${badgeSizeClasses[size]} bg-green-500 rounded-full border-2 border-surface`}
        />
      )}

      {/* Premium Badge */}
      {premium && (
        <div className="absolute -top-1 -right-1">
          <Crown className="text-yellow-400" size={size === 'xlarge' ? 20 : size === 'large' ? 16 : 12} />
        </div>
      )}

      {/* Verified Badge */}
      {verified && (
        <div className={`absolute ${badgePosition[size]} ${badgeSizeClasses[size]} bg-blue-500 rounded-full p-0.5`}>
          <Check className="text-white" size={size === 'xlarge' ? 12 : size === 'large' ? 10 : 8} />
        </div>
      )}

      {/* Custom Badge */}
      {badge && !premium && !verified && (
        <div className="absolute -top-1 -right-1">
          {badge}
        </div>
      )}
    </motion.div>
  )
}

export default Avatar