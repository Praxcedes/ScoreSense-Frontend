export const formatPoints = (points) => {
  return new Intl.NumberFormat('en-US').format(points)
}

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  })
}

export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const formatDateTime = (date) => {
  return `${formatDate(date)} • ${formatTime(date)}`
}

export const formatPercentage = (value) => {
  return `${Math.round(value * 100)}%`
}

export const formatCurrency = (amount, currency = 'PTS') => {
  return `${formatPoints(amount)} ${currency}`
}