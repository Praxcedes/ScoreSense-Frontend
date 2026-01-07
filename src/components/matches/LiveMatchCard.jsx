import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Clock, 
  MapPin, 
  Zap, 
  Activity,
  MessageSquare,
  Users,
  TrendingUp,
  TrendingDown
} from 'lucide-react'
import { useWebSocket } from '../../hooks/useWebSocket'

const LiveMatchCard = ({ match }) => {
  const { isConnected, subscribe, unsubscribe } = useWebSocket()
  const [matchData, setMatchData] = useState(match)
  const [commentary, setCommentary] = useState([])

  // Default match data
  const defaultMatch = {
    id: 1,
    league: 'Kenya Premier League',
    time: '45\'',
    venue: 'Kasarani Stadium',
    homeTeam: 'Gor Mahia',
    awayTeam: 'AFC Leopards',
    homeScore: 2,
    awayScore: 1,
    homePossession: 55,
    homeShots: 12,
    homeOnTarget: 6,
    homeCorners: 5,
    awayShots: 8,
    awayOnTarget: 4,
    awayCorners: 3,
    status: 'live',
    events: [
      { minute: '23\'', type: 'goal', team: 'home', player: 'Benson Omala' },
      { minute: '38\'', type: 'goal', team: 'away', player: 'Clifton Miheso' },
      { minute: '42\'', type: 'goal', team: 'home', player: 'Austin Odhiambo' },
      { minute: '65\'', type: 'yellow', team: 'away', player: 'Brian Mandela' }
    ]
  }

  useEffect(() => {
    if (!matchData) {
      setMatchData(defaultMatch)
    }

    // Subscribe to live updates
    if (isConnected) {
      subscribe(`match_${matchData?.id}`, (data) => {
        setMatchData(prev => ({ ...prev, ...data }))
      })

      subscribe(`commentary_${matchData?.id}`, (data) => {
        setCommentary(prev => [data, ...prev.slice(0, 5)])
      })
    }

    return () => {
      if (isConnected) {
        unsubscribe(`match_${matchData?.id}`)
        unsubscribe(`commentary_${matchData?.id}`)
      }
    }
  }, [isConnected, matchData?.id])

  if (!matchData) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-red-900/20 to-red-500/10 border border-red-500/30 rounded-2xl overflow-hidden"
    >
      {/* Live Header */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="font-bold text-white">LIVE NOW</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap size={16} className="text-white" />
            <span className="text-white font-medium">{matchData.time}</span>
          </div>
        </div>
      </div>

      {/* Match Info */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <span className="text-xl">⚽</span>
            </div>
            <div>
              <h3 className="font-bold">{matchData.league}</h3>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <MapPin size={14} />
                <span>{matchData.venue}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Activity size={18} className="text-green-400" />
            <span className="text-sm text-green-400">{isConnected ? 'Live Updates' : 'Offline'}</span>
          </div>
        </div>

        {/* Score Display */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <div className="text-4xl font-bold mb-2">{matchData.homeTeam}</div>
              <div className="text-6xl font-bold text-primary">{matchData.homeScore}</div>
            </div>
            
            <div className="px-8">
              <div className="text-center">
                <div className="text-xl text-text-secondary mb-2">Score</div>
                <div className="text-2xl font-bold">-</div>
              </div>
            </div>
            
            <div className="text-center flex-1">
              <div className="text-4xl font-bold mb-2">{matchData.awayTeam}</div>
              <div className="text-6xl font-bold text-primary">{matchData.awayScore}</div>
            </div>
          </div>
        </div>

        {/* Match Stats */}
        <div className="mb-6">
          <h4 className="font-bold mb-4 flex items-center space-x-2">
            <Activity size={18} />
            <span>Match Statistics</span>
          </h4>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-card rounded-xl">
              <div className="text-sm text-text-secondary mb-1">Possession</div>
              <div className="flex items-center justify-center space-x-2">
                <span className="font-bold">{matchData.homePossession}%</span>
                <span className="text-text-secondary">-</span>
                <span className="font-bold">{100 - matchData.homePossession}%</span>
              </div>
            </div>
            
            <div className="text-center p-3 bg-card rounded-xl">
              <div className="text-sm text-text-secondary mb-1">Shots</div>
              <div className="flex items-center justify-center space-x-2">
                <span className="font-bold">{matchData.homeShots}</span>
                <span className="text-text-secondary">-</span>
                <span className="font-bold">{matchData.awayShots}</span>
              </div>
            </div>
            
            <div className="text-center p-3 bg-card rounded-xl">
              <div className="text-sm text-text-secondary mb-1">Corners</div>
              <div className="flex items-center justify-center space-x-2">
                <span className="font-bold">{matchData.homeCorners}</span>
                <span className="text-text-secondary">-</span>
                <span className="font-bold">{matchData.awayCorners}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Events */}
        <div>
          <h4 className="font-bold mb-4 flex items-center space-x-2">
            <MessageSquare size={18} />
            <span>Live Commentary</span>
          </h4>
          
          <div className="space-y-3 max-h-40 overflow-y-auto">
            {matchData.events?.map((event, index) => (
              <div
                key={index}
                className={`p-3 rounded-xl ${
                  event.type === 'goal' 
                    ? 'bg-green-500/10 border border-green-500/20' 
                    : 'bg-card'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      event.type === 'goal' ? 'bg-green-500' :
                      event.type === 'yellow' ? 'bg-yellow-500' :
                      event.type === 'red' ? 'bg-red-500' :
                      'bg-blue-500'
                    }`}></div>
                    <div>
                      <div className="font-medium">
                        {event.type === 'goal' ? '⚽ GOAL!' :
                         event.type === 'yellow' ? '🟨 Yellow Card' :
                         event.type === 'red' ? '🟥 Red Card' : '📝 Update'}
                      </div>
                      <div className="text-sm text-text-secondary">{event.player}</div>
                    </div>
                  </div>
                  <div className="text-text-secondary font-medium">{event.minute}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Updates Bar */}
      <div className="px-4 py-3 bg-card/50 border-t border-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Live Updates Active</span>
          </div>
          <div className="text-sm text-text-secondary">
            Updated just now
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default LiveMatchCard