import api from './api'

const mapMatch = (match) => {
  if (!match) return match

  const homeTeam = match.homeTeam || match.home_team || match.home
  const awayTeam = match.awayTeam || match.away_team || match.away
  const homeScore = match.homeScore ?? match.home_score ?? match.home_team_score ?? match.current_score?.home ?? null
  const awayScore = match.awayScore ?? match.away_score ?? match.away_team_score ?? match.current_score?.away ?? null
  const startTime = match.startTime || match.start_time || match.start_date || match.startDate || null
  const status = match.status || match.match_status || match.matchStatus || 'upcoming'

  return {
    ...match,
    id: match.id || match.match_id || match.event_id,
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    startTime,
    league: match.league || match.league_name,
    venue: match.venue || match.stadium || match.location,
    sport: match.sport || match.sport_name,
    status,
    odds: match.odds || {
      home: match.odds_home || match.odds?.home_win,
      draw: match.odds_draw || match.odds?.draw,
      away: match.odds_away || match.odds?.away_win
    },
    homeLogo: match.homeLogo || match.home_logo || match.home_team_logo,
    awayLogo: match.awayLogo || match.away_logo || match.away_team_logo
  }
}

const normalizeResponse = (response) => {
  const matches = response?.matches || response?.data || response?.results || []
  return {
    ...response,
    success: response?.success ?? true,
    matches: Array.isArray(matches) ? matches.map(mapMatch) : [],
    count: response?.count ?? (Array.isArray(matches) ? matches.length : 0)
  }
}

export const matchesService = {
  async getLiveMatches() {
    try {
      const response = await api.get('/matches/live')
      return normalizeResponse(response)
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
      return normalizeResponse(response)
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
      const mapped = response?.match ? mapMatch(response.match) : mapMatch(response)
      return response || { success: false, match: mapped || null, error: 'Match not found' }
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
      const hasMatchFields = response && typeof response === 'object' &&
        ('matches' in response || 'data' in response || 'results' in response)

      if (!hasMatchFields || response?.success === false || response?.error) {
        throw new Error(response?.error || 'Search endpoint unavailable')
      }
      return normalizeResponse(response)
    } catch (error) {
      console.error('Error searching matches:', error)
      const normalizedQuery = query?.toLowerCase()?.trim()
      if (!normalizedQuery) {
        return { success: true, matches: [], count: 0 }
      }

      try {
        const [upcoming, live] = await Promise.all([
          api.get('/matches/upcoming', { params: { limit: Math.max(limit, 20) } }),
          api.get('/matches/live')
        ])

        const upcomingMatches = upcoming?.matches || upcoming?.data || []
        const liveMatches = live?.matches || live?.data || []
        const combined = [...liveMatches, ...upcomingMatches].map(mapMatch)

        const filtered = combined.filter((match) => {
          const haystack = [
            match?.name,
            match?.homeTeam,
            match?.awayTeam,
            match?.league,
            match?.sport
          ]
            .filter(Boolean)
            .join(' ')
            .toLowerCase()

          return haystack.includes(normalizedQuery)
        }).slice(0, limit)

        return { success: true, matches: filtered, count: filtered.length, source: 'fallback' }
      } catch (fallbackError) {
        return { 
          success: false, 
          matches: [], 
          count: 0, 
          error: error.message || 'Search failed',
          message: `No matches found for '${query}'`
        }
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
      return normalizeResponse(response)
    } catch (error) {
      console.error('Error fetching mock matches:', error)
      return { success: false, matches: [], count: 0, error: error.message }
    }
  },

  async getFeaturedMatches() {
    try {
      return await this.getUpcomingMatches(5)
    } catch (error) {
      return { success: false, matches: [], count: 0, error: error.message }
    }
  },

  async getMatchStats(matchId) {
    try {
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
