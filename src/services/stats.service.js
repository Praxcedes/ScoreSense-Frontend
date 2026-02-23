import api from './api'

export const statsService = {
  getSummary() {
    return api.get('/dashboard/summary')
  },

  getPredictions() {
    return api.get('/points/predictions')
  },

  getTransactions(params = {}) {
    return api.get('/points/transactions', { params })
  },

  getCommunityStats() {
    return api.get('/community/user/stats')
  }
}
