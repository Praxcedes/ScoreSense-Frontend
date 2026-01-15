import api from './api'

export const adminService = {
  getOverview() {
    return api.get('/admin/overview')
  },

  getTournaments({ page = 1, perPage = 20 } = {}) {
    return api.get('/admin/tournaments', { params: { page, per_page: perPage } })
  },

  getTournamentDetails(id) {
    return api.get(`/admin/tournaments/${id}`)
  },

  cancelTournament(id) {
    return api.post(`/admin/tournaments/${id}/cancel`)
  },

  getPredictions({ page = 1, perPage = 20, status } = {}) {
    const params = { page, per_page: perPage }
    if (status) params.status = status
    return api.get('/admin/predictions', { params })
  },

  resolvePrediction(id, outcome) {
    return api.post(`/admin/predictions/${id}/resolve`, { outcome })
  },

  getTransactions({ page = 1, perPage = 20 } = {}) {
    return api.get('/admin/transactions', { params: { page, per_page: perPage } })
  },

  getRevenue() {
    return api.get('/admin/revenue')
  },

  getConfig() {
    return api.get('/admin/config')
  },

  updateConfig(payload) {
    return api.put('/admin/config', payload)
  },

  runCleanup() {
    return api.post('/admin/maintenance/cleanup')
  },

  createBackup() {
    return api.post('/admin/maintenance/backup')
  },

  getAdminRequests() {
    return api.get('/admin/requests')
  },

  approveAdminRequest(userId) {
    return api.post(`/admin/requests/${userId}/approve`)
  },

  denyAdminRequest(userId) {
    return api.post(`/admin/requests/${userId}/deny`)
  }
}
