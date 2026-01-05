import React, { createContext, useState, useContext } from 'react'

export const PointsContext = createContext({})

export const usePoints = () => useContext(PointsContext)

// Mock data
const mockData = {
  points: 2450,
  transactions: [
    { id: 1, type: 'win', amount: 120, description: 'Man City vs Arsenal', date: 'Today' },
    { id: 2, type: 'prediction', amount: -50, description: 'UFC 305 Stake', date: 'Today' },
    { id: 3, type: 'win', amount: 80, description: 'Real vs Barca', date: 'Yesterday' },
    { id: 4, type: 'bonus', amount: 100, description: 'Daily Login Bonus', date: 'Jun 20' }
  ],
  leaderboard: [
    { id: 1, username: 'PredictorPro', points: 12500, winRate: 72.5, change: 8 },
    { id: 2, username: 'StatsMaster', points: 11800, winRate: 70.8, change: 12 },
    { id: 3, username: 'AnalystKing', points: 11200, winRate: 69.3, change: 5 },
    { id: 4, username: 'Juma_Predictor', points: 2450, winRate: 68.4, change: 15 },
    { id: 5, username: 'SportsWizard', points: 9800, winRate: 67.9, change: -3 }
  ]
}

export const PointsProvider = ({ children }) => {
  const [points, setPoints] = useState(mockData.points)
  const [transactions, setTransactions] = useState(mockData.transactions)
  const [leaderboard, setLeaderboard] = useState(mockData.leaderboard)

  const makePrediction = async (matchId, prediction, stake) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    
    if (stake > points) {
      return { success: false, error: 'Insufficient points' }
    }

    // Deduct stake
    const newPoints = points - stake
    setPoints(newPoints)

    // Add transaction
    const newTransaction = {
      id: transactions.length + 1,
      type: 'prediction',
      amount: -stake,
      description: `Prediction on ${prediction}`,
      date: 'Now'
    }
    setTransactions(prev => [newTransaction, ...prev])

    return {
      success: true,
      prediction: {
        matchId,
        prediction,
        stake,
        potential: Math.round(stake * 1.8)
      }
    }
  }

  const addPoints = async (amount, source) => {
    const newPoints = points + amount
    setPoints(newPoints)
    
    const newTransaction = {
      id: transactions.length + 1,
      type: 'bonus',
      amount,
      description: source,
      date: 'Now'
    }
    setTransactions(prev => [newTransaction, ...prev])

    return { success: true, balance: newPoints }
  }

  const value = {
    points,
    transactions,
    leaderboard,
    makePrediction,
    addPoints,
    claimBonus: (type) => addPoints(100, `${type} Bonus`)
  }

  return (
    <PointsContext.Provider value={value}>
      {children}
    </PointsContext.Provider>
  )
}