import React, { createContext, useState, useContext, useEffect } from 'react'
import { pointsService } from '../services/points.service'
import walletService from '../services/walletService'
import api from '../services/api'
import { useWebSocket } from '../hooks/useWebSocket'

export const PointsContext = createContext({})

export const usePoints = () => useContext(PointsContext)

export const PointsProvider = ({ children }) => {
  const [points, setPoints] = useState(0)
  const [celoBalance, setCeloBalance] = useState(0)
  const [transactions, setTransactions] = useState([])
  const [leaderboard, setLeaderboard] = useState([])
  const [predictions, setPredictions] = useState([])
  const [predictionsStats, setPredictionsStats] = useState({
    total_predictions: 0,
    active_predictions: 0,
    won_predictions: 0,
    lost_predictions: 0,
    win_rate: 0
  })
  const [loading, setLoading] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')

  const webSocket = useWebSocket()
  const subscribe = webSocket?.subscribe || (() => {})
  const unsubscribe = webSocket?.unsubscribe || (() => {})
  const send = webSocket?.send || (() => {})
  const isConnected = webSocket?.isConnected || false

  // Initialize wallet connection and blockchain data
  useEffect(() => {
    const initBlockchainData = async () => {
      const token = localStorage.getItem('accessToken')
      if (!token) return

      // Check wallet connection
      const isWalletConnected = walletService.getIsConnected()
      setWalletConnected(isWalletConnected)
      
      if (isWalletConnected) {
        const address = walletService.getAddress()
        setWalletAddress(address)
        if (address) {
          await fetchBlockchainBalances(address)
        }
      }

      // Fetch traditional points data
      await fetchPointsData()
    }

    initBlockchainData()

    // Listen for wallet events
    const handleWalletConnected = () => {
      setWalletConnected(true)
      const address = walletService.getAddress()
      setWalletAddress(address)
      fetchBlockchainBalances(address)
    }

    const handleWalletDisconnected = () => {
      setWalletConnected(false)
      setWalletAddress('')
      setCeloBalance(0)
    }

    window.addEventListener('walletAccountChanged', handleWalletConnected)
    window.addEventListener('walletDisconnected', handleWalletDisconnected)

    return () => {
      window.removeEventListener('walletAccountChanged', handleWalletConnected)
      window.removeEventListener('walletDisconnected', handleWalletDisconnected)
    }
  }, [])

  useEffect(() => {
    if (!isConnected) return

    subscribe('points_update', (data) => {
      setPoints(data.balance)
      if (data.transaction) {
        setTransactions(prev => [data.transaction, ...prev])
      }
    })

    subscribe('blockchain_transaction', (data) => {
      if (data.type === 'token_transfer') {
        fetchBlockchainBalances(walletAddress)
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
      unsubscribe('blockchain_transaction')
      unsubscribe('leaderboard_update')
      unsubscribe('prediction_settled')
    }
  }, [isConnected, walletAddress])

  const fetchPointsData = async () => {
    try {
      const [pointsData, transactionsData, leaderboardData, predictionsData] = await Promise.all([
        pointsService.getPoints().catch(() => ({ balance: points })),
        pointsService.getTransactions().catch(() => []),
        pointsService.getLeaderboard().catch(() => []),
        pointsService.getPredictions().catch(() => ({ predictions: [], stats: null }))
      ])
      setPoints(pointsData.balance || pointsData.points_balance || 0)
      setTransactions(transactionsData)
      setLeaderboard(leaderboardData)
      if (Array.isArray(predictionsData)) {
        setPredictions(predictionsData)
      } else {
        setPredictions(predictionsData.predictions || [])
        if (predictionsData.stats) {
          setPredictionsStats({
            total_predictions: predictionsData.stats.total_predictions || 0,
            active_predictions: predictionsData.stats.active_predictions || 0,
            won_predictions: predictionsData.stats.won_predictions || 0,
            lost_predictions: predictionsData.stats.lost_predictions || 0,
            win_rate: predictionsData.stats.win_rate || 0
          })
        }
      }
    } catch (error) {
      console.error('Failed to fetch points data:', error)
    }
  }

  const fetchBlockchainBalances = async (address) => {
    if (!address) return
    const token = localStorage.getItem('accessToken')
    if (!token) return
    
    try {
      // Get blockchain balances from backend
      const response = await api.get('/blockchain/balance')
      if (response && response.points_balance) {
        // Convert blockchain points to display format
        setPoints(prev => Math.max(prev, response.points_balance))
      }
      if (response && response.celo_balance) {
        setCeloBalance(parseFloat(response.celo_balance))
      }
    } catch (error) {
      console.error('Failed to fetch blockchain balances:', error)
    }
  }

  const connectWallet = async () => {
    setLoading(true)
    try {
      const result = await walletService.connectWallet()
      if (result.success) {
        setWalletConnected(true)
        setWalletAddress(result.address)
        await fetchBlockchainBalances(result.address)
        
        // Register wallet with backend
        await registerWalletWithBackend(result.address)
        
        return { success: true, address: result.address }
      } else {
        return { success: false, error: result.error }
      }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const registerWalletWithBackend = async (address) => {
    try {
      const token = localStorage.getItem('accessToken')
      if (!token) return

      // Sign message for verification
      const message = `Connect wallet to ScoreSense: ${Date.now()}`
      const signature = await walletService.signMessage(message)

      // Send to backend
      await api.post('/blockchain/connect', {
        wallet_address: address,
        signature: signature,
        message: message
      })

      console.log('Wallet registered with backend')
    } catch (error) {
      console.error('Error registering wallet:', error)
    }
  }

  const addPoints = async (amount, source) => {
    try {
      const newBalance = await pointsService.addPoints(amount, source)
      setPoints(newBalance.balance || newBalance)
      return { success: true, balance: newBalance.balance || newBalance }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const makePrediction = async (matchId, prediction, stake) => {
    try {
      const result = await pointsService.makePrediction(matchId, prediction, stake)
      setPoints(result.balance)
      return { success: true, balance: result.balance }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const claimBonus = async (bonusType) => {
    try {
      const result = await pointsService.claimBonus(bonusType)
      setPoints(result.balance)
      return { success: true, balance: result.balance }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const transferTokens = async (toAddress, amount) => {
    try {
      // This would call a backend endpoint that initiates blockchain transaction
      const response = await api.post('/blockchain/transfer', {
        to_address: toAddress,
        amount: amount
      })
      return { success: true, transactionHash: response.transaction_hash }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const value = {
    points,
    celoBalance,
    transactions,
    leaderboard,
    predictions,
    predictionsStats,
    loading,
    walletConnected,
    walletAddress,
    connectWallet,
    addPoints,
    makePrediction,
    claimBonus,
    transferTokens,
    fetchBlockchainBalances: () => fetchBlockchainBalances(walletAddress)
  }

  return (
    <PointsContext.Provider value={value}>
      {children}
    </PointsContext.Provider>
  )
}
