import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Trophy,
  Users,
  Calendar,
  Award,
  Target,
  DollarSign,
  Clock,
  ChevronRight,
  Crown,
  Star,
  TrendingUp,
  Zap,
  Shield,
  Gift,
  BarChart3,
  Filter,
  Search,
  Coins,
  Gamepad2,
  Sparkles
} from 'lucide-react'
import * as ethers from 'ethers'
import { useWeb3 } from '../../hooks/useWeb3'
import { getContractCode, getCoinClashAddress, getPointsTokenId } from '../../services/blockchain'
import CoinClashAnimation from '../../components/CoinClashAnimation'
import { toast } from 'react-hot-toast'

const CoinClash = () => {
  const [activeTab, setActiveTab] = useState('available')
  const [searchQuery, setSearchQuery] = useState('')
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pointsBalance, setPointsBalance] = useState(0)
  const [isApproved, setIsApproved] = useState(false)
  const [showLiveModal, setShowLiveModal] = useState(false)
  const [liveSession, setLiveSession] = useState(null)
  const [liveMode, setLiveMode] = useState('play')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [createEntry, setCreateEntry] = useState(100)
  const { address, contract, readContract, pointsContract, pointsReadContract, connectWallet, ensureNetwork, connecting } = useWeb3()

  const tabs = [
    { id: 'available', name: 'Available' },
    { id: 'ongoing', name: 'Ongoing' },
    { id: 'completed', name: 'Completed' },
    { id: 'my', name: 'My Games' }
  ]

  useEffect(() => {
    fetchCoinClashSessions()
  }, [address, readContract])

  const mapStateToStatus = (state) => {
    switch (Number(state)) {
      case 0:
        return 'WAITING'
      case 1:
        return 'ACTIVE'
      case 2:
        return 'COMPLETED'
      case 3:
        return 'CANCELLED'
      default:
        return 'WAITING'
    }
  }

  const mapTierToEntry = (tier) => {
    switch (Number(tier)) {
      case 0:
        return { label: 'TIER_100', entry: 100 }
      case 1:
        return { label: 'TIER_300', entry: 300 }
      case 2:
        return { label: 'TIER_500', entry: 500 }
      default:
        return { label: 'UNKNOWN', entry: 0 }
    }
  }

  const formatCountdown = (isoString) => {
    if (!isoString) return null
    const target = new Date(isoString)
    if (Number.isNaN(target.getTime())) return null
    const diffMs = target.getTime() - Date.now()
    if (diffMs <= 0) return null
    const totalSeconds = Math.floor(diffMs / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    if (minutes <= 0) return `${seconds}s`
    return `${minutes}m ${String(seconds).padStart(2, '0')}s`
  }

  const getRoundLabel = (session) => {
    const hasRound = session?.round_active === true || session?.current_round_display != null
    if (!hasRound) return null
    const roundValue = session?.current_round_display ?? session?.current_round
    if (roundValue === null || roundValue === undefined) return null
    return `Round ${roundValue}`
  }

  const getWaitingMessages = (session) => {
    const messages = []
    if (session?.auto_start_when_full) {
      messages.push('Starts immediately when full')
    }
    if (session?.auto_start_min_players && session?.auto_start_after_seconds) {
      const minutes = Math.round(session.auto_start_after_seconds / 60)
      messages.push(`Auto-starts after ${minutes} min if ${session.auto_start_min_players}+ players join`)
    }
    if (session?.auto_cancel_after_seconds) {
      const minutes = Math.round(session.auto_cancel_after_seconds / 60)
      const minPlayers = session.auto_start_min_players || 2
      messages.push(`Auto-cancels after ${minutes} min if <${minPlayers} players join`)
    }
    return messages
  }

  const ensureWalletReady = async () => {
    if (!address) {
      const result = await connectWallet()
      if (!result.success) {
        throw new Error(result.error || 'Wallet connection failed')
      }
    }
    await ensureNetwork()
  }

  const fetchCoinClashSessions = async () => {
    try {
      setLoading(true)
      setError(null)
      
      if (!readContract) {
        setSessions([])
        setError('Connect your wallet to load CoinClash tournaments.')
        return
      }

      const code = await getContractCode()
      if (!code || code === '0x') {
        setSessions([])
        setError('No CoinClash contract found at the configured address.')
        return
      }

      const [tournamentCounter, requiredPlayers] = await Promise.all([
        readContract.tournamentCounter(),
        readContract.requiredPlayers()
      ])

      const total = Number(tournamentCounter.toString())
      const maxPlayers = Number(requiredPlayers.toString())

      const tournamentCalls = Array.from({ length: total }, (_, index) => (
        readContract.getTournament(index)
      ))

      const tournaments = await Promise.all(tournamentCalls)
      const baseSessions = tournaments.map((tournament) => {
        const [
          id,
          tier,
          entryFeeWei,
          prizePoolWei,
          state,
          currentRound,
          playersJoined,
          contractMaxPlayers
        ] = tournament

        const tierInfo = mapTierToEntry(tier)
        const formatEther = ethers.formatEther || ethers.utils.formatEther
        const entryFee = Number(formatEther(entryFeeWei))
        const prizePool = Number(formatEther(prizePoolWei))

        return {
          id: Number(id.toString()),
          name: `CoinClash ${tierInfo.label} #${Number(id.toString())}`,
          max_players: Number(contractMaxPlayers.toString()) || maxPlayers,
          current_players: Number(playersJoined.toString()),
          entry_points: Math.round(entryFee || tierInfo.entry),
          total_pot: Math.round(prizePool),
          current_round: Number(currentRound.toString()),
          current_round_display: null,
          round_active: Number(state) === 1,
          status: mapStateToStatus(state),
          entryFeeWei: entryFeeWei.toString(),
          auto_start_when_full: true,
          auto_start_min_players: 2,
          auto_start_after_seconds: 300,
          auto_cancel_after_seconds: 300,
          side_selection_mode: 'free'
        }
      })

      if (address && pointsReadContract) {
        try {
          const tokenId = getPointsTokenId()
          const [balance, approved] = await Promise.all([
            pointsReadContract.balanceOf(address, tokenId),
            pointsReadContract.isApprovedForAll(address, getCoinClashAddress())
          ])
          const formatUnits = ethers.formatUnits || ethers.utils.formatUnits
          setPointsBalance(Number(formatUnits(balance, 18)))
          setIsApproved(Boolean(approved))
        } catch (readError) {
          console.warn('Failed to read points balance or approval:', readError)
        }
      }

      if (address) {
        const settled = await Promise.allSettled(
          baseSessions.map(async (session) => {
            const status = await readContract.getPlayerStatus(session.id, address)
            const isMine = status?.paid || false
            return { ...session, isMine }
          })
        )
        const sessionsWithPlayer = settled.map((result, index) => {
          if (result.status === 'fulfilled') {
            return result.value
          }
          return baseSessions[index]
        })
        setSessions(sessionsWithPlayer)
      } else {
        setSessions(baseSessions)
      }
    } catch (err) {
      console.error('Error fetching CoinClash sessions:', err)
      setError(err.message || 'Failed to load CoinClash sessions.')
      setSessions([])
    } finally {
      setLoading(false)
    }
  }

  const joinSession = (sessionId) => {
    const session = sessions.find(item => item.id === sessionId)
    if (!session) {
      toast.error('Session not found')
      return
    }
    setLiveSession(session)
    setLiveMode('join')
    setShowLiveModal(true)
  }

  const confirmJoin = async (sessionId, choice) => {
    try {
      await ensureWalletReady()
      if (!contract) {
        throw new Error('Wallet not connected')
      }

      if (!pointsContract) {
        throw new Error('Points contract not available')
      }

      if (!isApproved) {
        throw new Error('Approve points before joining a tournament')
      }

      const tx = await contract.joinTournament(sessionId, choice)
      await tx.wait()
      await fetchCoinClashSessions()
      setLiveMode('play')
      toast.success('Joined session successfully!')
    } catch (err) {
      toast.error(err.message || 'Error joining session. Please try again.')
    }
  }

  const approvePoints = async () => {
    try {
      await ensureWalletReady()
      if (!pointsContract) {
        throw new Error('Points contract not available')
      }
      const tx = await pointsContract.setApprovalForAll(getCoinClashAddress(), true)
      await tx.wait()
      setIsApproved(true)
      toast.success('Points approval successful!')
    } catch (err) {
      toast.error(err.message || 'Failed to approve points.')
    }
  }

  const openLiveModal = (session, mode = 'play') => {
    setLiveSession(session)
    setLiveMode(mode)
    setShowLiveModal(true)
  }

  const closeLiveModal = () => {
    setShowLiveModal(false)
    setLiveSession(null)
    setLiveMode('play')
  }

  const createSession = () => {
    setCreateEntry(100)
    setShowCreateModal(true)
  }

  const confirmCreateSession = async () => {
    try {
      await ensureWalletReady()
      if (!contract) {
        throw new Error('Wallet not connected')
      }

      const entry = parseInt(createEntry, 10)
      const tier = entry === 300 ? 1 : entry === 500 ? 2 : 0

      const tx = await contract.createTournament(tier)
      await tx.wait()
      await fetchCoinClashSessions()
      setShowCreateModal(false)
      toast.success('Tournament created successfully!')
    } catch (err) {
      toast.error(err.message || 'Error creating session. Please try again.')
    }
  }

  const submitChoice = async (sessionId, choice) => {
    try {
      await ensureWalletReady()
      if (!contract) {
        throw new Error('Wallet not connected')
      }
      const tx = await contract.submitChoice(sessionId, choice)
      await tx.wait()
      await fetchCoinClashSessions()
      toast.success('Choice submitted!')
    } catch (err) {
      toast.error(err.message || 'Failed to submit choice.')
    }
  }

  const resolveRound = async (sessionId) => {
    try {
      await ensureWalletReady()
      if (!contract) {
        throw new Error('Wallet not connected')
      }
      const tx = await contract.resolveRound(sessionId)
      await tx.wait()
      await fetchCoinClashSessions()
      toast.success('Round resolved!')
    } catch (err) {
      toast.error(err.message || 'Failed to resolve round.')
    }
  }

  const filteredSessions = sessions.filter(session => {
    if (!searchQuery) return true
    return session.name.toLowerCase().includes(searchQuery.toLowerCase())
  }).filter((session) => {
    if (activeTab === 'available') return session.status === 'WAITING'
    if (activeTab === 'ongoing') return session.status === 'ACTIVE'
    if (activeTab === 'completed') return session.status === 'COMPLETED'
    if (activeTab === 'my') return session.isMine
    return true
  })

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl p-8 border border-primary/20">
          <div className="h-8 bg-surface-soft rounded w-64 mb-4 animate-pulse"></div>
          <div className="h-4 bg-surface-soft rounded w-48 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-64 bg-surface rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl p-8 border border-primary/20"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Coins className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">CoinClash Arena</h1>
                <p className="text-text-secondary">Multiplayer coinflip tournament with smart contracts</p>
              </div>
            </div>
            <p className="text-text-secondary mt-2">
              Join fast-paced coinflip tournaments. Last player standing takes the pot!
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              {address && (
                <div className="text-sm text-text-secondary">
                  Balance: <span className="font-semibold text-white">{pointsBalance} PTS</span>
                </div>
              )}
              <button
                onClick={approvePoints}
                disabled={!address || connecting || isApproved}
                className="px-4 py-2 bg-card border border-card text-sm rounded-lg hover:bg-hover transition disabled:opacity-60"
              >
                {isApproved ? 'Points Approved' : 'Approve Points'}
              </button>
              <button
                onClick={createSession}
                disabled={connecting}
                className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-semibold hover:opacity-90 transition flex items-center space-x-2"
              >
                <Gamepad2 size={20} />
                <span>{connecting ? 'Connecting...' : 'Create Game'}</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {error && (
        <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-500/5 rounded-2xl p-4 border border-yellow-500/20">
          <div className="flex items-center space-x-2 text-yellow-400">
            <Sparkles size={20} />
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
              activeTab === tab.id
                ? 'bg-primary text-black'
                : 'bg-surface text-text-secondary hover:bg-hover'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" size={20} />
          <input
            type="text"
            placeholder="Search CoinClash sessions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-surface border border-card rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter size={20} className="text-text-secondary" />
          <select className="bg-surface border border-card rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary">
            <option>All Games</option>
            <option>Waiting</option>
            <option>Active</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSessions.map((session) => {
          const roundLabel = getRoundLabel(session)
          const waitingMessages = getWaitingMessages(session)
          const startCountdown = formatCountdown(session.starts_at)
          const cancelCountdown = formatCountdown(session.expires_at)
          const isCancelled = session.status === 'CANCELLED'
          const duelMode = session.side_selection_mode === 'duel_auto_assign'

          return (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{session.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        session.status === 'WAITING' ? 'bg-green-500/20 text-green-400' :
                        session.status === 'ACTIVE' ? 'bg-yellow-500/20 text-yellow-400' :
                        session.status === 'CANCELLED' ? 'bg-red-500/20 text-red-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {session.status === 'CANCELLED' ? 'Closed' : session.status}
                      </div>
                      {roundLabel && (
                        <span className="text-sm text-text-secondary">{roundLabel}</span>
                      )}
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl flex items-center justify-center">
                    <Coins className="text-yellow-500" size={20} />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-text-secondary">Players</span>
                      <span className="font-semibold">{session.current_players}/{session.max_players}</span>
                    </div>
                    <div className="w-full bg-card rounded-full h-2">
                      <div 
                        className="h-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full" 
                        style={{ width: `${(session.current_players / session.max_players) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-surface-soft rounded-lg p-3">
                      <div className="text-sm text-text-secondary">Entry</div>
                      <div className="font-bold text-lg">{session.entry_points} PTS</div>
                    </div>
                    <div className="bg-surface-soft rounded-lg p-3">
                      <div className="text-sm text-text-secondary">Pot</div>
                      <div className="font-bold text-lg">{session.total_pot} PTS</div>
                    </div>
                  </div>

                  {duelMode && (
                    <div className="text-xs text-text-secondary">
                      Duel mode: opponent auto-assigned the opposite side.
                    </div>
                  )}

                  {session.status === 'WAITING' && (
                    <div className="text-xs text-text-secondary uppercase tracking-widest space-y-1">
                      {waitingMessages.map((message) => (
                        <div key={message}>{message}</div>
                      ))}
                      {startCountdown && <div>Starts in {startCountdown}</div>}
                      {cancelCountdown && <div>Auto-cancels in {cancelCountdown}</div>}
                    </div>
                  )}

                  <button
                    onClick={() => joinSession(session.id)}
                    disabled={isCancelled || session.status !== 'WAITING' || session.current_players >= session.max_players}
                    className={`w-full py-3 rounded-lg font-semibold transition ${
                      session.status === 'WAITING' && session.current_players < session.max_players && !isCancelled
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:opacity-90'
                        : 'bg-card text-text-secondary cursor-not-allowed'
                    }`}
                  >
                    {isCancelled
                      ? 'Closed • Refund issued'
                      : session.status === 'WAITING' && session.current_players < session.max_players
                      ? 'Join Game'
                      : session.current_players >= session.max_players
                      ? 'Full'
                      : 'In Progress'}
                  </button>

                  {session.status === 'ACTIVE' && (
                    <div className="grid grid-cols-3 gap-2 mt-3">
                      <button
                        onClick={() => submitChoice(session.id, 0)}
                        className="py-2 rounded-lg bg-card text-sm hover:bg-hover transition"
                      >
                        Heads
                      </button>
                      <button
                        onClick={() => submitChoice(session.id, 1)}
                        className="py-2 rounded-lg bg-card text-sm hover:bg-hover transition"
                      >
                        Tails
                      </button>
                      <button
                        onClick={() => resolveRound(session.id)}
                        className="py-2 rounded-lg bg-primary text-black text-sm hover:opacity-90 transition"
                      >
                        Resolve
                      </button>
                    </div>
                  )}

                  {session.status === 'ACTIVE' && (
                    <button
                      onClick={() => openLiveModal(session, 'play')}
                      className="w-full mt-3 py-2 rounded-lg bg-surface text-sm font-semibold hover:bg-hover transition"
                    >
                      View Live
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {showLiveModal && liveSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-lg bg-card border border-card rounded-2xl p-6 relative">
            <button
              onClick={closeLiveModal}
              className="absolute right-4 top-4 text-text-secondary hover:text-white transition"
            >
              ×
            </button>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold">{liveSession.name}</h3>
                <p className="text-text-secondary text-sm">
                  {getRoundLabel(liveSession)
                    ? `${getRoundLabel(liveSession)} • `
                    : ''}
                  {liveSession.current_players}/{liveSession.max_players} players
                </p>
              </div>
              <div className="text-xs uppercase tracking-widest text-yellow-400">
                Live
              </div>
            </div>
            <div className="py-6 flex flex-col items-center gap-8">
              <CoinClashAnimation status={liveSession.status} />
              {liveMode === 'join' ? (
                <div className="text-center space-y-4">
                  <p className="text-sm text-text-secondary">
                    {liveSession.side_selection_mode === 'duel_auto_assign'
                      ? 'Choose your side. Opponent will be auto-assigned the opposite.'
                      : 'Choose your side to join this tournament.'}
                  </p>
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => confirmJoin(liveSession.id, 0)}
                      className="px-4 py-2 rounded-lg bg-card border border-card text-sm hover:bg-hover transition"
                    >
                      Heads
                    </button>
                    <button
                      onClick={() => confirmJoin(liveSession.id, 1)}
                      className="px-4 py-2 rounded-lg bg-card border border-card text-sm hover:bg-hover transition"
                    >
                      Tails
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={() => submitChoice(liveSession.id, 0)}
                    className="px-4 py-2 rounded-lg bg-card border border-card text-sm hover:bg-hover transition"
                  >
                    Heads
                  </button>
                  <button
                    onClick={() => submitChoice(liveSession.id, 1)}
                    className="px-4 py-2 rounded-lg bg-card border border-card text-sm hover:bg-hover transition"
                  >
                    Tails
                  </button>
                  <button
                    onClick={() => resolveRound(liveSession.id)}
                    className="px-4 py-2 rounded-lg bg-primary text-black text-sm hover:opacity-90 transition"
                  >
                    Resolve
                  </button>
                </div>
              )}
              {liveSession.status === 'WAITING' && (
                <div className="text-xs text-text-secondary uppercase tracking-widest space-y-1">
                  {getWaitingMessages(liveSession).map((message) => (
                    <div key={message}>{message}</div>
                  ))}
                  {formatCountdown(liveSession.starts_at) && (
                    <div>Starts in {formatCountdown(liveSession.starts_at)}</div>
                  )}
                  {formatCountdown(liveSession.expires_at) && (
                    <div>Auto-cancels in {formatCountdown(liveSession.expires_at)}</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-md bg-card border border-card rounded-2xl p-6 relative">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute right-4 top-4 text-text-secondary hover:text-white transition"
            >
              ×
            </button>
            <div className="mb-6">
              <h3 className="text-xl font-bold">Create CoinClash Game</h3>
              <p className="text-text-secondary text-sm mt-1">
                Choose an entry tier to start a new tournament.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[100, 300, 500].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setCreateEntry(amount)}
                  className={`py-3 rounded-xl font-semibold transition ${
                    createEntry === amount
                      ? 'bg-primary text-black'
                      : 'bg-card border border-card text-text-secondary hover:bg-hover'
                  }`}
                >
                  {amount} PTS
                </button>
              ))}
            </div>
            <button
              onClick={confirmCreateSession}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold hover:opacity-90 transition"
            >
              Create Game
            </button>
          </div>
        </div>
      )}

      {/* How to Play */}
      <div className="card p-6">
        <h2 className="text-xl font-bold mb-4">How to Play CoinClash</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
              <Users className="text-primary" size={24} />
            </div>
            <h3 className="font-bold">1. Join or Create</h3>
            <p className="text-text-secondary text-sm">Join an existing game or create your own with custom entry fee.</p>
          </div>
          <div className="space-y-3">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-yellow-500/10 rounded-xl flex items-center justify-center">
              <Coins className="text-yellow-500" size={24} />
            </div>
            <h3 className="font-bold">2. Choose Side</h3>
            <p className="text-text-secondary text-sm">Pick heads or tails. Each round eliminates wrong guesses.</p>
          </div>
          <div className="space-y-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-xl flex items-center justify-center">
              <Trophy className="text-green-500" size={24} />
            </div>
            <h3 className="font-bold">3. Win the Pot</h3>
            <p className="text-text-secondary text-sm">Last player standing wins the entire pot!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoinClash
