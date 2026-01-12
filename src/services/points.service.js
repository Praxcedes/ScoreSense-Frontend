import api from "/src/services/api.js"

const normalizePrediction = (prediction) => {
  if (!prediction) return null

  const homeTeam = prediction.home_team || prediction.homeTeam
  const awayTeam = prediction.away_team || prediction.awayTeam

  return {
    id: prediction.id || prediction.prediction_id || prediction.match_id,
    status: prediction.status || prediction.prediction_status,
    match: prediction.match || prediction.match_name || prediction.name || (
      homeTeam && awayTeam ? `${homeTeam} vs ${awayTeam}` : undefined
    ),
    prediction: prediction.prediction || prediction.pick || prediction.market,
    odds: prediction.odds || prediction.odds_value || prediction.odds_decimal,
    stake: prediction.stake || prediction.amount || prediction.points_staked,
    potential: prediction.potential || prediction.potential_return || prediction.payout,
    confidence: prediction.confidence || prediction.confidence_score,
    result: prediction.result || prediction.outcome,
    timeLeft: prediction.time_left || prediction.timeLeft,
    raw: prediction,
  }
}

export const pointsService = {
  async getPoints() {
    try {
      const response = await api.get('/points/balance')
      if (response && response.balance) {
        return { balance: response.balance.points }
      }
      return { balance: 1000 }
    } catch (error) {
      console.log('Using fallback points data:', error.message)
      return { balance: 1000 }
    }
  },

  async getTransactions() {
    try {
      const response = await api.get('/points/transactions')
      if (response && response.transactions) {
        return response.transactions
      }
      return []
    } catch (error) {
      console.log('Using mock transactions:', error.message)
      return []
    }
  },

  async getLeaderboard() {
    try {
      const response = await api.get('/points/leaderboard')
      if (response && response.leaderboard) {
        return response.leaderboard
      }
      return []
    } catch (error) {
      console.log('Using mock leaderboard:', error.message)
      return []
    }
  },

  async getPredictions() {
    try {
      const response = await api.get('/points/predictions')
      const predictions = (response?.recent_predictions || response?.predictions || [])
        .map(normalizePrediction)
        .filter(Boolean)
      return { predictions, stats: response?.stats || null }
    } catch (error) {
      console.log('Using mock predictions:', error.message)
      return { predictions: [], stats: null }
    }
  },

  async makePrediction(matchId, prediction, stake) {
    try {
      const response = await api.post('/points/spend', {
        amount: stake,
        reason: `Prediction on match ${matchId}: ${prediction}`,
        reference_id: `prediction_${matchId}`
      })
      if (response && response.new_balance !== undefined) {
        return { balance: response.new_balance }
      }
      return { balance: 1000 - stake }
    } catch (error) {
      console.log('Mock prediction made:', error.message)
      return { balance: 1000 - stake }
    }
  },

  async addPoints(amount, source) {
    try {
      const response = await api.post('/points/earn', {
        amount: amount,
        reason: source,
        reference_id: `earn_${Date.now()}`
      })
      if (response && response.new_balance !== undefined) {
        return { balance: response.new_balance }
      }
      return { balance: 1000 + amount }
    } catch (error) {
      console.log('Mock points added:', error.message)
      return { balance: 1000 + amount }
    }
  },

  async claimBonus(bonusType) {
    try {
      const response = await api.post('/points/earn', {
        amount: 50,
        reason: `Bonus: ${bonusType}`,
        reference_id: `bonus_${bonusType}`
      })
      if (response && response.new_balance !== undefined) {
        return { balance: response.new_balance }
      }
      return { balance: 1000 + 50 }
    } catch (error) {
      console.log('Mock bonus claimed:', error.message)
      return { balance: 1000 + 50 }
    }
  }
}
