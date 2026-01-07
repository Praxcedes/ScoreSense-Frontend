import React, { createContext, useState, useContext, useEffect } from 'react'
import { pointsService } from '../services/points.service'
import { useWebSocket } from '../hooks/useWebSocket'

export const PointsContext = createContext({})

export const usePoints = () => useContext(PointsContext)

export const PointsProvider = ({ children }) => {
  const [points, setPoints] = useState(2450)
  const [transactions, setTransactions] = useState([])
  const [leaderboard, setLeaderboard] = useState([])
  const [predictions, setPredictions] = useState([])

  const webSocket = useWebSocket()
  const subscribe = webSocket?.subscribe || (() => {})
  const unsubscribe = webSocket?.unsubscribe || (() => {})
  const send = webSocket?.send || (() => {})
  const isConnected = webSocket?.isConnected || false

  useEffect(() => {
    fetchPointsData()
  }, [])

  useEffect(() => {
    if (!isConnected) return

    subscribe('points_update', (data) => {
      setPoints(data.balance)
      if (data.transaction) {
        setTransactions(prev => [data.transaction, ...prev])
      }
    })

    subscribe('leaderboard_update', (data) => {
      setLeaderboard(data.leaderboard)
    })

    subscribe('prediction_settled', (data) => {
      setPredictions(prev => prev.map(p =>
        p.id === data.predictionId ? { ...p, ...data } : p
      ))
    })

    return () => {
      unsubscribe('points_update')
      unsubscribe('leaderboard_update')
      unsubscribe('prediction_settled')
    }
  }, [isConnected]) // only subscribe when WS is connected

  const fetchPointsData = async () => {
    try {
      const [pointsData, transactionsData, leaderboardData, predictionsData] = await Promise.all([
        pointsService.getPoints().catch(() => ({ balance: points })),
        pointsService.getTransactions().catch(() => []),
        pointsService.getLeaderboard().catch(() => []),
        pointsService.getPredictions().catch(() => [])
      ])
      setPoints(pointsData.balance)
      setTransactions(transactionsData)
      setLeaderboard(leaderboardData)
      setPredictions(predictionsData)
    } catch (error) {
      console.error('Failed to fetch points data:', error)
    }
  }

  const addPoints = async (amount, source) => {
    try {
      const newBalance = await pointsService.addPoints(amount, source)
      setPoints(newBalance)
      send('points_earned', { amount, source })
      return { success: true, balance: newBalance }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const makePrediction = async (matchId, prediction, stake) => {
    if (stake > points) return { success: false, error: 'Insufficient points' }

    try {
      const result = await pointsService.makePrediction(matchId, prediction, stake)
      setPoints(prev => prev - stake)
      setPredictions(prev => [...prev, result.prediction])
      send('prediction_made', { matchId, prediction, stake })
      return { success: true, ...result }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const claimBonus = async (bonusType) => {
    try {
      const result = await pointsService.claimBonus(bonusType)
      setPoints(prev => prev + result.amount)
      return { success: true, ...result }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const value = {
    points,
    transactions,
    leaderboard,
    predictions,
    addPoints,
    makePrediction,
    claimBonus,
    refreshPointsData: fetchPointsData
  }

  return (
    <PointsContext.Provider value={value}>
      {children}
    </PointsContext.Provider>
  )
}

