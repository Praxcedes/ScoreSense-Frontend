import React, { createContext, useState, useContext, useEffect } from 'react'

export const MatchesContext = createContext({})

export const useMatches = () => useContext(MatchesContext)

// Rich mock data for all matches
const mockMatches = {
  live: [
    {
      id: 1,
      league: 'Kenya Premier League',
      time: '65\'',
      venue: 'Kasarani Stadium',
      homeTeam: 'Gor Mahia',
      awayTeam: 'AFC Leopards',
      homeScore: 2,
      awayScore: 1,
      homePossession: 58,
      status: 'live',
      events: [
        { minute: '23\'', type: 'goal', team: 'home', player: 'Benson Omala' },
        { minute: '38\'', type: 'goal', team: 'away', player: 'Clifton Miheso' },
        { minute: '42\'', type: 'goal', team: 'home', player: 'Austin Odhiambo' }
      ]
    },
    {
      id: 2,
      league: 'UFC 305',
      time: 'Round 3',
      fighters: ['Israel Adesanya', 'Dricus Du Plessis'],
      status: 'live',
      isUFC: true
    }
  ],
  upcoming: [
    {
      id: 3,
      league: 'Premier League',
      date: 'Today • 19:30',
      venue: 'Etihad Stadium',
      homeTeam: 'Man City',
      awayTeam: 'Arsenal',
      homeOdds: 1.85,
      drawOdds: 3.50,
      awayOdds: 4.20,
      homeWinProb: 55,
      awayWinProb: 45
    },
    {
      id: 4,
      league: 'La Liga',
      date: 'Today • 22:00',
      homeTeam: 'Real Madrid',
      awayTeam: 'Barcelona',
      homeOdds: 2.10,
      drawOdds: 3.40,
      awayOdds: 3.60
    }
  ],
  featured: [
    {
      id: 5,
      league: 'UFC Main Card',
      date: 'June 22 • 23:00',
      weightClass: 'Middleweight',
      fighters: ['Robert Whittaker', 'Khamzat Chimaev'],
      ranks: ['Rank #3', 'Rank #10'],
      isUFC: true,
      featured: true
    }
  ]
}

export const MatchesProvider = ({ children }) => {
  const [liveMatches, setLiveMatches] = useState(mockMatches.live)
  const [upcomingMatches, setUpcomingMatches] = useState(mockMatches.upcoming)
  const [featuredMatches, setFeaturedMatches] = useState(mockMatches.featured)

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMatches(prev => prev.map(match => {
        if (match.status === 'live' && !match.isUFC) {
          // Randomly update scores (for demo)
          if (Math.random() > 0.9) {
            return {
              ...match,
              homeScore: match.homeScore + 1,
              events: [
                ...match.events,
                { 
                  minute: `${parseInt(match.time) + 1}'`, 
                  type: 'goal', 
                  team: Math.random() > 0.5 ? 'home' : 'away',
                  player: 'Demo Goal'
                }
              ]
            }
          }
        }
        return match
      }))
    }, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [])

  const value = {
    liveMatches,
    upcomingMatches,
    featuredMatches,
    loading: false,
    refreshMatches: () => {
      // Just reset to initial data
      setLiveMatches(mockMatches.live)
      setUpcomingMatches(mockMatches.upcoming)
      setFeaturedMatches(mockMatches.featured)
    }
  }

  return (
    <MatchesContext.Provider value={value}>
      {children}
    </MatchesContext.Provider>
  )
}