import api from './api'

export const matchesService = {
  async getLiveMatches() {
    const response = await api.get('/matches/live')
    return response
  },

  async getUpcomingMatches() {
    const response = await api.get('/matches/upcoming')
    return response
  },

  async getFeaturedMatches() {
    const response = await api.get('/matches/featured')
    return response
  },

  async getMatchDetails(id) {
    const response = await api.get(`/matches/${id}`)
    return response
  },

  async getMatchStats(id) {
    const response = await api.get(`/matches/${id}/stats`)
    return response
  },

  async searchMatches(query) {
    const response = await api.get('/matches/search', { params: { q: query } })
    return response
  }
}