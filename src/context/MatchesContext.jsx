import React, { createContext, useState, useContext, useEffect, useCallback } from 'react'
import { matchesService } from '../services/matches.service'

const defaultContextValue = {
  liveMatches: [],
  upcomingMatches: [],
  featuredMatches: [],
  loading: false,
  error: null,
  refreshMatches: () => Promise.resolve(),
  getMatchById: () => null,
  searchMatches: async () => []
}

export const MatchesContext = createContext(defaultContextValue)

export const useMatches = () => {
  const context = useContext(MatchesContext)
  return context
}

export const MatchesProvider = ({ children }) => {
  const [liveMatches, setLiveMatches] = useState([])
  const [upcomingMatches, setUpcomingMatches] = useState([])
  const [featuredMatches, setFeaturedMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchMatches = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const [liveResponse, upcomingResponse, featuredResponse] = await Promise.all([
        matchesService.getLiveMatches(),
        matchesService.getUpcomingMatches(5, null, 4328),
        matchesService.getFeaturedMatches()
      ])

      if (liveResponse?.success) {
        setLiveMatches(liveResponse.matches || [])
      } else {
        console.warn('Failed to load live matches:', liveResponse?.error)
        setLiveMatches([])
      }

      if (upcomingResponse?.success) {
        setUpcomingMatches(upcomingResponse.matches || [])
      } else {
        console.warn('Failed to load upcoming matches:', upcomingResponse?.error)
        setUpcomingMatches([])
      }

      if (featuredResponse?.success) {
        setFeaturedMatches(featuredResponse.matches || [])
      } else {
        console.warn('Failed to load featured matches:', featuredResponse?.error)
        setFeaturedMatches([])
      }
    } catch (error) {
      console.error('Failed to fetch matches:', error)
      setError('Failed to load matches. Please try again.')
      setLiveMatches([])
      setUpcomingMatches([])
      setFeaturedMatches([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMatches()
  }, [fetchMatches])

  const getMatchById = (id) => {
    const allMatches = [...liveMatches, ...upcomingMatches, ...featuredMatches]
    return allMatches.find((match) => match.id === id)
  }

  const searchMatches = async (query) => {
    try {
      const response = await matchesService.searchMatches(query, 10)
      if (response.success) {
        return response.matches || []
      }
      return []
    } catch (error) {
      console.error('Search error:', error)
      return []
    }
  }

  const value = {
    liveMatches,
    upcomingMatches,
    featuredMatches,
    loading,
    error,
    refreshMatches: fetchMatches,
    getMatchById,
    searchMatches
  }

  return (
    <MatchesContext.Provider value={value}>
      {children}
    </MatchesContext.Provider>
  )
}
