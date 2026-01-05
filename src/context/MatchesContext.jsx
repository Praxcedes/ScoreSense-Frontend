import React, { createContext, useState, useContext, useEffect } from 'react'
import { useWebSocket } from '../hooks/useWebSocket'
import { matchesService } from '../services/matches.service'

export const MatchesContext = createContext({})

export const useMatches = () => useContext(MatchesContext)

export const MatchesProvider = ({ children }) => {
  const [liveMatches, setLiveMatches] = useState([])
  const [upcomingMatches, setUpcomingMatches] = useState([])
  const [featuredMatches, setFeaturedMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const { subscribe, unsubscribe, isConnected } = useWebSocket()

  useEffect(() => {
    fetchMatches()
  }, [])

  // Subscribe to WebSocket events only when connected
  useEffect(() => {
    if (!isConnected) return

    subscribe('live_score_update', handleLiveScoreUpdate)
    subscribe('match_status_update', handleMatchStatusUpdate)
    subscribe('new_goal', handleNewGoal)
    subscribe('match_started', handleMatchStarted)

    return () => {
      unsubscribe('live_score_update')
      unsubscribe('match_status_update')
      unsubscribe('new_goal')
      unsubscribe('match_started')
    }
  }, [isConnected])

  const fetchMatches = async () => {
    try {
      setLoading(true)
      const [liveData, upcomingData, featuredData] = await Promise.all([
        matchesService.getLiveMatches().catch(() => []),
        matchesService.getUpcomingMatches().catch(() => []),
        matchesService.getFeaturedMatches().catch(() => [])
      ])
      setLiveMatches(liveData)
      setUpcomingMatches(upcomingData)
      setFeaturedMatches(featuredData)
    } catch (error) {
      console.error('Failed to fetch matches:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLiveScoreUpdate = (data) => {
    setLiveMatches(prev =>
      prev.map(match =>
        match.id === data.matchId ? { ...match, ...data.updates } : match
      )
    )
  }

  const handleMatchStatusUpdate = (data) => {
    const updateMatch = (matches) =>
      matches.map(match =>
        match.id === data.matchId ? { ...match, status: data.status } : match
      )

    setLiveMatches(updateMatch)
    setUpcomingMatches(updateMatch)
  }

  const handleNewGoal = (data) => {
    setLiveMatches(prev =>
      prev.map(match => {
        if (match.id === data.matchId) {
          const updatedMatch = { ...match }
          if (data.team === 'home') {
            updatedMatch.homeScore = (updatedMatch.homeScore || 0) + 1
          } else {
            updatedMatch.awayScore = (updatedMatch.awayScore || 0) + 1
          }

          updatedMatch.events = [
            ...(updatedMatch.events || []),
            {
              type: 'goal',
              team: data.team,
              player: data.player,
              minute: data.minute
            }
          ]

          return updatedMatch
        }
        return match
      })
    )
  }

  const handleMatchStarted = (data) => {
    if (!data.match) return
    setUpcomingMatches(prev => prev.filter(m => m.id !== data.matchId))
    setLiveMatches(prev => [...prev, data.match])
  }

  const getMatchById = (id) => {
    const allMatches = [...liveMatches, ...upcomingMatches]
    return allMatches.find(match => match.id === id)
  }

  const value = {
    liveMatches,
    upcomingMatches,
    featuredMatches,
    loading,
    refreshMatches: fetchMatches,
    getMatchById
  }

  return (
    <MatchesContext.Provider value={value}>
      {children}
    </MatchesContext.Provider>
  )
}
