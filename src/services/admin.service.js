import api from './api'

export const adminService = {
  getOverview() {
    return api.get('/admin/overview')
  },

  listTournaments(params = {}) {
    return api.get('/admin/tournaments', { params })
  },

  getTournament(id) {
    return api.get(`/admin/tournaments/${id}`)
  },

  cancelTournament(id) {
    return api.post(`/admin/tournaments/${id}/cancel`)
  },

  listPredictions(params = {}) {
    return api.get('/admin/predictions', { params })
  },

  resolvePrediction(id, outcome) {
    return api.post(`/admin/predictions/${id}/resolve`, { outcome })
  },

  listTransactions(params = {}) {
    return api.get('/admin/transactions', { params })
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
  }
}
