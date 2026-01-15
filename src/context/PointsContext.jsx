import React, { createContext, useState, useContext, useEffect } from 'react'
import { pointsService } from '../services/points.service'
import walletService from '../services/walletService'
import api from '../services/api'
import { useWebSocket } from '../hooks/useWebSocket'

export const PointsContext = createContext({})

export const usePoints = () => useContext(PointsContext)

const normalizeArray = (value) => (Array.isArray(value) ? value : [])

export const PointsProvider = ({ children }) => {
  const [points, setPoints] = useState(0)
  const [celoBalance, setCeloBalance] = useState(0)
  const [transactions, setTransactions] = useState([])
  const [leaderboard, setLeaderboard] = useState([])
  const [predictions, setPredictions] = useState([])
  const [loading, setLoading] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')

  const webSocket = useWebSocket()
  const subscribe = webSocket?.subscribe || (() => {})
  const unsubscribe = webSocket?.unsubscribe || (() => {})
  const send = webSocket?.send || (() => {})
  const isConnected = webSocket?.isConnected || false

  useEffect(() => {
    const initBlockchainData = async () => {
      const token = localStorage.getItem('accessToken')
      if (!token) return

      const isWalletConnected = walletService.getIsConnected()
      setWalletConnected(isWalletConnected)

      if (isWalletConnected) {
        const address = walletService.getAddress()
        setWalletAddress(address)
        await fetchBlockchainBalances(address)
      }

      await fetchPointsData()
    }

    initBlockchainData()

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
        setTransactions((prev) => [data.transaction, ...prev])
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
      setPredictions((prev) =>
        prev.map((prediction) =>
          prediction.id === data.predictionId ? { ...prediction, ...data } : prediction
        )
      )
    })

    return () => {
      unsubscribe('points_update')
      unsubscribe('blockchain_transaction')
      unsubscribe('leaderboard_update')
      unsubscribe('prediction_settled')
    }
  }, [isConnected, walletAddress, subscribe, unsubscribe])

  const fetchPointsData = async () => {
    try {
      const [pointsData, transactionsData, leaderboardData, predictionsData] = await Promise.all([
        pointsService.getPoints().catch(() => ({ balance: points })),
        pointsService.getTransactions().catch(() => []),
        pointsService.getLeaderboard().catch(() => []),
        pointsService.getPredictions().catch(() => [])
      ])

      setPoints(pointsData.balance || pointsData.points_balance || 0)
      setTransactions(normalizeArray(transactionsData))
      setLeaderboard(normalizeArray(leaderboardData))

      const normalizedPredictions = Array.isArray(predictionsData)
        ? predictionsData
        : normalizeArray(predictionsData?.recent_predictions || predictionsData?.predictions)
      setPredictions(normalizedPredictions)
    } catch (error) {
      console.error('Failed to fetch points data:', error)
    }
  }

  const fetchBlockchainBalances = async (address) => {
    if (!address) return

    try {
      const response = await api.get('/blockchain/balance')
      if (response && response.points_balance) {
        setPoints((prev) => Math.max(prev, response.points_balance))
      }
      if (response && response.celo_balance) {
        setCeloBalance(parseFloat(response.celo_balance))
      }
    } catch (error) {
      const message = error?.error || error?.message || ''
      if (message.toLowerCase().includes('wallet')) {
        return
      }
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
        await registerWalletWithBackend(result.address)
        return { success: true, address: result.address }
      }
      return { success: false, error: result.error }
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

      const message = `Connect wallet to ScoreSense: ${Date.now()}`
      const signature = await walletService.signMessage(message)

      await api.post('/blockchain/connect', {
        wallet_address: address,
        signature: signature,
        message: message
      })
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
    if (!walletConnected) {
      return { success: false, error: 'Connect your wallet to make predictions.' }
    }
    if (stake < 10) {
      return { success: false, error: 'Minimum stake is 10 points.' }
    }

    try {
      const result = await pointsService.makePrediction(matchId, prediction, stake)
      setPoints(result.balance)
      setPredictions((prev) => [
        {
          id: `local_${Date.now()}`,
          match_id: matchId,
          prediction,
          amount: stake,
          potential_payout: stake,
          status: 'pending',
          created_at: new Date().toISOString()
        },
        ...prev
      ])
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
