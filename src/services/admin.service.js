import api from './api'

const adminService = {
  // Tournaments
  getTournaments({ page = 1, perPage = 20 } = {}) {
    return api.get('/admin/tournaments', { params: { page, per_page: perPage } })
  },
  getTournament(id) {
    return api.get(`/admin/tournaments/${id}`)
  },
  cancelTournament(id) {
    return api.post(`/admin/tournaments/${id}/cancel`)
  },

  // Predictions
  getPredictions({ page = 1, perPage = 20, status } = {}) {
    const params = { page, per_page: perPage }
    if (status) params.status = status
    return api.get('/admin/predictions', { params })
  },
  resolvePrediction(id, outcome) {
    return api.post(`/admin/predictions/${id}/resolve`, { outcome })
  },

  // Transactions
  getTransactions({ page = 1, perPage = 20 } = {}) {
    return api.get('/admin/transactions', { params: { page, per_page: perPage } })
  },

  // Aliases to match pages currently using listX naming
  listTournaments(args) {
    return this.getTournaments(args)
  },
  listPredictions(args) {
    return this.getPredictions(args)
  },
  listTransactions(args) {
    return this.getTransactions(args)
  }
}

export default adminService

export { adminService }
