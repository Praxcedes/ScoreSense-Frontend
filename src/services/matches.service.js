import { apiCall, buildUrl } from './api'
import { API_ENDPOINTS } from '../config/env.js'

export const matchesService = {
  async getLiveMatches() {
    try {
      const response = await apiCall('GET', API_ENDPOINTS.MATCHES.LIVE)
      return response
    } catch (error) {
      console.error('Failed to fetch live matches:', error)
      throw error
    }
  },

  async getUpcomingMatches() {
    try {
      const response = await apiCall('GET', API_ENDPOINTS.MATCHES.UPCOMING)
      return response
    } catch (error) {
      console.error('Failed to fetch upcoming matches:', error)
      throw error
    }
  },

  async getFeaturedMatches() {
    try {
      const response = await apiCall('GET', API_ENDPOINTS.MATCHES.FEATURED)
      return response
    } catch (error) {
      console.error('Failed to fetch featured matches:', error)
      throw error
    }
  },

  async getMatchDetails(id) {
    try {
      const response = await apiCall('GET', buildUrl(API_ENDPOINTS.MATCHES.DETAILS, { id }))
      return response
    } catch (error) {
      console.error(`Failed to fetch match details for ${id}:`, error)
      throw error
    }
  },

  async getMatchStats(id) {
    try {
      const response = await apiCall('GET', buildUrl(API_ENDPOINTS.MATCHES.STATS, { id }))
      return response
    } catch (error) {
      console.error(`Failed to fetch match stats for ${id}:`, error)
      throw error
    }
  },

  async searchMatches(query) {
    try {
      const response = await apiCall('GET', API_ENDPOINTS.MATCHES.SEARCH, { q: query })
      return response
    } catch (error) {
      console.error('Failed to search matches:', error)
      throw error
    }
  }
}