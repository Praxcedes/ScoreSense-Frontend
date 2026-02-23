import api from './api'

const normalizeStatus = (status) => {
  if (!status) return status
  const normalized = String(status).toLowerCase()
  if (normalized === 'finished') return 'completed'
  if (normalized === 'canceled') return 'cancelled'
  return normalized
}

const normalizeMatch = (match = {}) => {
  const odds = match.odds || {}
  const rawStartTime = match.start_time || match.startTime
  const rawStartDate = match.start_date || match.startDate
  const homeTeam = match.homeTeam || match.home_team || match.home
  const awayTeam = match.awayTeam || match.away_team || match.away
  const homeMeta = match.home || match.homeTeam
  const awayMeta = match.away || match.awayTeam

  return {
    ...match,
    id: match.id || match.match_id || match.event_id || match.eventId,
    name: match.name || (homeTeam && awayTeam ? `${homeTeam} vs ${awayTeam}` : undefined),
    league: match.league || match.league_name || match.leagueName,
    status: normalizeStatus(match.status || match.match_status || match.matchStatus),
    startTime: rawStartTime || rawStartDate || match.startTime || match.start_date || match.startDate,
    startDate: rawStartDate || rawStartTime || match.start_date || match.startDate,
    homeTeam,
    awayTeam,
    homeLogo: match.homeLogo || match.home_logo || match.home_badge || match.homeBadge || match.home_team_logo || homeMeta?.logo || homeMeta?.badge,
    awayLogo: match.awayLogo || match.away_logo || match.away_badge || match.awayBadge || match.away_team_logo || awayMeta?.logo || awayMeta?.badge,
    homeScore: match.homeScore ?? match.home_score ?? match.home_team_score,
    awayScore: match.awayScore ?? match.away_score ?? match.away_team_score,
    venue: match.venue || match.stadium,
    sport: match.sport || match.sport_name || match.category,
    time: match.time || match.match_time || match.minute || rawStartTime || match.start_time,
    homePossession: match.homePossession ?? match.home_possession,
    awayPossession: match.awayPossession ?? match.away_possession,
    odds: {
      home: odds.home ?? odds.home_win ?? match.odds_home,
      draw: odds.draw ?? match.odds_draw,
      away: odds.away ?? odds.away_win ?? match.odds_away
    }
  }
}

const normalizeMatchesResponse = (response) => {
  if (!response) return response

  const rawMatches = Array.isArray(response.matches)
    ? response.matches
    : Array.isArray(response.data)
      ? response.data
      : []

  if (!Array.isArray(rawMatches)) return response

  return {
    ...response,
    matches: rawMatches.map(normalizeMatch)
  }
}

export const matchesService = {
  async getLiveMatches() {
    try {
      const response = await api.get('/matches/live')
      return normalizeMatchesResponse(response) || { success: false, matches: [], count: 0 }
    } catch (error) {
      console.error('Error fetching live matches:', error)
      return { 
        success: false, 
        matches: [], 
        count: 0, 
        error: error.message || 'Failed to load live matches',
        source: 'error'
      }
    }
  },

  async getUpcomingMatches(limit = 20, sport = null, league = null) {
    try {
      const params = { limit }
      if (sport) params.sport = sport
      if (league) params.league = league

      const response = await api.get('/matches/upcoming', { params })
      return normalizeMatchesResponse(response) || { success: false, matches: [], count: 0 }
    } catch (error) {
      console.error('Error fetching upcoming matches:', error)
      return { 
        success: false, 
        matches: [], 
        count: 0, 
        error: error.message || 'Failed to load upcoming matches',
        source: 'error'
      }
    }
  },

  async getMatchDetails(matchId) {
    try {
      const response = await api.get(`/matches/${matchId}`)
      if (response?.match) {
        return { ...response, match: normalizeMatch(response.match) }
      }
      return response || { success: false, match: null, error: 'Match not found' }
    } catch (error) {
      console.error('Error fetching match details:', error)
      return { 
        success: false, 
        match: null, 
        error: error.message || 'Failed to load match details'
      }
    }
  },

  async searchMatches(query, limit = 20) {
    try {
      const response = await api.get('/matches/search', { 
        params: { q: query, limit } 
      })
      return normalizeMatchesResponse(response) || { success: false, matches: [], count: 0 }
    } catch (error) {
      console.error('Error searching matches:', error)
      return { 
        success: false, 
        matches: [], 
        count: 0, 
        error: error.message || 'Search failed',
        message: `No matches found for '${query}'`
      }
    }
  },

  async clearMatchesCache() {
    try {
      const response = await api.post('/matches/cache/clear')
      return response || { success: false, message: 'Cache clear failed' }
    } catch (error) {
      console.error('Error clearing cache:', error)
      return { success: false, message: error.message }
    }
  },

  async getMockMatches(limit = 10) {
    try {
      const response = await api.get('/matches/mock', { params: { limit } })
      return normalizeMatchesResponse(response) || { success: false, matches: [], count: 0 }
    } catch (error) {
      console.error('Error fetching mock matches:', error)
      return { success: false, matches: [], count: 0, error: error.message }
    }
  },

  // Fallback methods if API endpoints don't exist
  async getFeaturedMatches() {
    try {
      // Try to get some upcoming matches as featured
      return await this.getUpcomingMatches(5)
    } catch (error) {
      return { success: false, matches: [], count: 0, error: error.message }
    }
  },

  async getMatchStats(matchId) {
    try {
      // For now, return basic stats
      const match = await this.getMatchDetails(matchId)
      if (match.success) {
        return {
          success: true,
          stats: {
            possession: { home: 52, away: 48 },
            shots: { home: 15, away: 12 },
            shotsOnTarget: { home: 6, away: 4 },
            corners: { home: 5, away: 3 },
            fouls: { home: 12, away: 15 }
          }
        }
      }
      return match
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}
