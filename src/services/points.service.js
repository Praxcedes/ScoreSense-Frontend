import api from './api'

export const pointsService = {
  async getPoints() {
    const response = await api.get('/points/balance')
    return response
  },

  async getTransactions() {
    const response = await api.get('/points/transactions')
    return response
  },

  async getLeaderboard() {
    const response = await api.get('/points/leaderboard')
    return response
  },

  async getPredictions() {
    const response = await api.get('/points/predictions')
    return response
  },

  async makePrediction(matchId, prediction, stake) {
    const response = await api.post('/points/predict', { matchId, prediction, stake })
    return response
  },

  async addPoints(amount, source) {
    const response = await api.post('/points/add', { amount, source })
    return response
  },

  async claimBonus(bonusType) {
    const response = await api.post('/points/bonus', { type: bonusType })
    return response
  }
}