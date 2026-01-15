import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Gift, TrendingUp, History, CreditCard, Plus, Wallet, ExternalLink, Copy, Check } from 'lucide-react'
import { usePoints } from '../../hooks/usePoints'
import { pointsService } from '../../services/points.service'
import { toast } from 'react-hot-toast'

const Points = () => {
  const {
    points,
    celoBalance,
    transactions,
    leaderboard,
    walletConnected,
    walletAddress,
    connectWallet,
    disconnectWallet,
    fetchBlockchainBalances
  } = usePoints()

  const [activeTab, setActiveTab] = useState('transactions')
  const [walletLoading, setWalletLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [rewards, setRewards] = useState([])
  const [rewardsLoading, setRewardsLoading] = useState(false)

  useEffect(() => {
    // Refresh blockchain balances periodically
    const interval = setInterval(() => {
      if (walletConnected && walletAddress) {
        fetchBlockchainBalances()
      }
    }, 30000) // Every 30 seconds

    return () => clearInterval(interval)
  }, [walletConnected, walletAddress, fetchBlockchainBalances])

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        setRewardsLoading(true)
        const response = await pointsService.getRewards()
        setRewards(response.rewards || [])
      } catch (error) {
        console.error('Failed to load rewards:', error)
      } finally {
        setRewardsLoading(false)
      }
    }

    fetchRewards()
  }, [])

  const tabs = [
    { id: 'transactions', name: 'Transactions' },
    { id: 'rewards', name: 'Rewards' },
    { id: 'leaderboard', name: 'Leaderboard' },
    { id: 'blockchain', name: 'Blockchain' }
  ]

  const handleConnectWallet = async () => {
    setWalletLoading(true)
    const result = await connectWallet()
    setWalletLoading(false)
    
    if (result.success) {
      toast.success('Wallet connected successfully')
    } else {
      toast.error(result.error || 'Failed to connect wallet')
    }
  }

  const handleDisconnectWallet = async () => {
    await disconnectWallet()
    toast.success('Wallet disconnected')
  }

  const copyAddress = () => {
    if (!walletAddress) return
    navigator.clipboard.writeText(walletAddress)
    setCopied(true)
    toast.success('Address copied to clipboard')
    setTimeout(() => setCopied(false), 2000)
  }

  const formatAddress = (address) => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const openExplorer = () => {
    if (!walletAddress) return
    window.open(`https://celo-sepolia.blockscout.com/address/${walletAddress}`, '_blank')
  }

  const handleRedeem = async (reward) => {
    try {
      const response = await pointsService.redeemReward(reward.id)
      if (response?.success) {
        toast.success(response.message || 'Reward redeemed!')
      } else {
        toast.error(response?.error || 'Failed to redeem reward')
      }
    } catch (error) {
      toast.error(error?.error || 'Failed to redeem reward')
    }
  }

  const handleClaim = async (reward) => {
    try {
      const response = await pointsService.claimReward(reward.id)
      if (response?.success) {
        toast.success(response.message || 'Bonus claimed!')
      } else {
        toast.error(response?.error || 'Failed to claim bonus')
      }
    } catch (error) {
      toast.error(error?.error || 'Failed to claim bonus')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with Points and Wallet Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl p-8 border border-primary/20"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Virtual Economy</h1>
            <p className="text-text-secondary mt-2">
              Earn, spend, and trade points. Your key to premium features and rewards.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col md:flex-row gap-6">
            {/* Points Balance */}
            <div className="text-center md:text-right">
              <div className="text-5xl font-bold text-primary">{points.toLocaleString()}</div>
              <div className="text-text-secondary">Total Points</div>
              <div className="flex items-center justify-center md:justify-end space-x-2 mt-2">
                <ArrowUpRight className="text-green-400" size={16} />
                <span className="text-green-400 text-sm">On-chain & Platform</span>
              </div>
            </div>

            {/* Wallet Connection */}
            <div className="text-center md:text-right">
              {walletConnected ? (
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                  <div className="flex items-center justify-center md:justify-end gap-2 mb-2">
                    <Wallet size={16} className="text-green-400" />
                    <span className="text-green-400 text-sm">Wallet Connected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-300">{formatAddress(walletAddress)}</span>
                    <button onClick={copyAddress} className="p-1 hover:bg-gray-800 rounded">
                      {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} className="text-gray-400" />}
                    </button>
                    <button onClick={openExplorer} className="p-1 hover:bg-gray-800 rounded">
                      <ExternalLink size={12} className="text-gray-400" />
                    </button>
                  </div>
                  {celoBalance > 0 && (
                    <div className="mt-2 text-sm">
                      <span className="text-gray-400">CELO: </span>
                      <span className="text-white font-semibold">{celoBalance.toFixed(4)}</span>
                    </div>
                  )}
                  <button
                    onClick={handleDisconnectWallet}
                    className="mt-3 w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium py-2 px-4 rounded-lg transition-all"
                  >
                    Disconnect Wallet
                  </button>
                </div>
              ) : (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                  <div className="flex items-center justify-center md:justify-end gap-2 mb-2">
                    <Wallet size={16} className="text-yellow-400" />
                    <span className="text-yellow-400 text-sm">Wallet Not Connected</span>
                  </div>
                  <button
                    onClick={handleConnectWallet}
                    disabled={walletLoading}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-sm font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 w-full transition-all disabled:opacity-50"
                  >
                    {walletLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Connecting...
                      </>
                    ) : (
                      <>
                        <Wallet size={16} />
                        Connect Wallet
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button className="card p-6 hover:bg-hover transition-all text-center">
          <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Plus className="text-green-400" size={24} />
          </div>
          <h3 className="font-bold">Earn Points</h3>
          <p className="text-text-secondary text-sm mt-1">Make predictions and win</p>
        </button>
        <button className="card p-6 hover:bg-hover transition-all text-center">
          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
            <CreditCard className="text-blue-400" size={24} />
          </div>
          <h3 className="font-bold">Redeem</h3>
          <p className="text-text-secondary text-sm mt-1">Exchange for rewards</p>
        </button>
        <button className="card p-6 hover:bg-hover transition-all text-center">
          <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="text-purple-400" size={24} />
          </div>
          <h3 className="font-bold">Invest</h3>
          <p className="text-text-secondary text-sm mt-1">Grow your points</p>
        </button>
        <button className="card p-6 hover:bg-hover transition-all text-center">
          <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Wallet className="text-orange-400" size={24} />
          </div>
          <h3 className="font-bold">Blockchain</h3>
          <p className="text-text-secondary text-sm mt-1">Manage wallet & tokens</p>
        </button>
      </div>

      {/* Tabs Section */}
      <div className="card p-6">
        {/* Tabs */}
        <div className="flex space-x-1 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[120px] py-2.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'text-text-secondary hover:text-white hover:bg-hover'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <div className="space-y-4">
            {transactions.length === 0 ? (
              <div className="text-center py-10 text-text-secondary">
                No transactions yet.
              </div>
            ) : (
              transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-4 bg-card rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      tx.transaction_type?.includes('earned') || tx.amount > 0 ? 'bg-green-500/20' :
                      tx.transaction_type?.includes('bonus') ? 'bg-yellow-500/20' :
                      'bg-blue-500/20'
                    }`}>
                      {tx.amount > 0 ? (
                        <ArrowUpRight className="text-green-400" size={16} />
                      ) : (
                        <CreditCard className="text-blue-400" size={16} />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{tx.description || tx.transaction_type}</p>
                      <p className="text-sm text-text-secondary">{tx.reference_id || 'Transaction'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${tx.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {tx.amount > 0 ? '+' : ''}{tx.amount} PTS
                    </p>
                    <p className="text-sm text-text-secondary">
                      {tx.created_at ? new Date(tx.created_at).toLocaleDateString() : '—'}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Rewards Tab */}
        {activeTab === 'rewards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rewardsLoading && (
              <div className="text-center py-10 text-text-secondary col-span-full">
                Loading rewards...
              </div>
            )}
            {!rewardsLoading && rewards.length === 0 && (
              <div className="text-center py-10 text-text-secondary col-span-full">
                No rewards available yet.
              </div>
            )}
            {rewards.map((reward) => (
              <div
                key={reward.id}
                className={`p-4 rounded-xl border ${
                  reward.available === false
                    ? 'bg-green-500/10 border-green-500/30'
                    : 'bg-card border-card'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{reward.name}</h4>
                    <p className="text-sm text-text-secondary">
                      {reward.points_award ? `+${reward.points_award} PTS` : `${reward.points_cost} PTS`}
                    </p>
                    {reward.meta && reward.meta.current_streak && (
                      <p className="text-xs text-text-secondary mt-1">
                        Current streak: {reward.meta.current_streak}
                      </p>
                    )}
                    {reward.meta && reward.meta.activity_score !== undefined && (
                      <p className="text-xs text-text-secondary mt-1">
                        Activity score: {reward.meta.activity_score}
                      </p>
                    )}
                  </div>
                  <button
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      reward.available === false || reward.claimable === false
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-primary text-white hover:bg-primary/90'
                    }`}
                    onClick={() =>
                      reward.points_cost > 0 ? handleRedeem(reward) : handleClaim(reward)
                    }
                    disabled={reward.available === false || reward.claimable === false}
                  >
                    {reward.points_cost > 0 ? 'Redeem' : 'Claim'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="space-y-4">
            {leaderboard.length === 0 ? (
              <div className="text-center py-10 text-text-secondary">
                No leaderboard data yet.
              </div>
            ) : (
              leaderboard.map((user) => (
                <div key={user.user_id || user.rank} className="flex items-center justify-between p-4 bg-card rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      user.rank === 1 ? 'bg-yellow-500/20 text-yellow-400' :
                      user.rank === 2 ? 'bg-gray-500/20 text-gray-400' :
                      user.rank === 3 ? 'bg-orange-500/20 text-orange-400' :
                      'bg-primary/20 text-primary'
                    }`}>
                      #{user.rank}
                    </div>
                    <div>
                      <p className="font-medium">{user.username || 'User'}</p>
                      <p className="text-sm text-text-secondary">{(user.points || 0).toLocaleString()} PTS</p>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-text-secondary">
                    Level {user.level || 1}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Blockchain Tab */}
        {activeTab === 'blockchain' && (
          <div className="space-y-6">
            {!walletConnected ? (
              <div className="text-center py-8">
                <Wallet size={48} className="text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Connect Your Wallet</h3>
                <p className="text-text-secondary mb-6">
                  Connect your wallet to view blockchain balances and manage tokens
                </p>
                <button
                  onClick={handleConnectWallet}
                  disabled={walletLoading}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 mx-auto transition-all disabled:opacity-50"
                >
                  {walletLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Wallet size={20} />
                      Connect Wallet
                    </>
                  )}
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-900 rounded-xl p-6">
                    <h4 className="font-bold mb-4">Blockchain Assets</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                            <span className="text-yellow-400 font-bold">C</span>
                          </div>
                          <div>
                            <p className="font-medium">CELO</p>
                            <p className="text-sm text-text-secondary">Native token</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{celoBalance.toFixed(4)}</p>
                          <p className="text-sm text-text-secondary">Balance</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                            <span className="text-primary font-bold">P</span>
                          </div>
                          <div>
                            <p className="font-medium">ScoreSense Points</p>
                            <p className="text-sm text-text-secondary">ERC-1155 Token</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{points.toLocaleString()}</p>
                          <p className="text-sm text-text-secondary">Balance</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900 rounded-xl p-6">
                    <h4 className="font-bold mb-4">Wallet Information</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-text-secondary mb-1">Network</p>
                        <p className="font-medium">Celo Sepolia Testnet</p>
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary mb-1">Wallet Address</p>
                        <div className="flex items-center gap-2">
                          <p className="font-mono text-sm break-all">{walletAddress}</p>
                          <button onClick={copyAddress} className="p-1 hover:bg-gray-800 rounded">
                            {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} className="text-gray-400" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary mb-1">Explorer</p>
                        <button
                          onClick={openExplorer}
                          className="text-primary hover:text-primary/80 flex items-center gap-1"
                        >
                          View on Blockscout
                          <ExternalLink size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 rounded-xl p-6">
                  <h4 className="font-bold mb-4">Blockchain Actions</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="p-4 bg-blue-500/20 hover:bg-blue-500/30 rounded-xl text-center transition-colors">
                      <div className="w-10 h-10 bg-blue-500/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <ArrowUpRight className="text-blue-400" size={20} />
                      </div>
                      <p className="font-medium">Send Tokens</p>
                      <p className="text-sm text-text-secondary">Transfer to another wallet</p>
                    </button>
                    <button className="p-4 bg-green-500/20 hover:bg-green-500/30 rounded-xl text-center transition-colors">
                      <div className="w-10 h-10 bg-green-500/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <TrendingUp className="text-green-400" size={20} />
                      </div>
                      <p className="font-medium">Stake</p>
                      <p className="text-sm text-text-secondary">Earn rewards</p>
                    </button>
                    <button className="p-4 bg-purple-500/20 hover:bg-purple-500/30 rounded-xl text-center transition-colors">
                      <div className="w-10 h-10 bg-purple-500/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <CreditCard className="text-purple-400" size={20} />
                      </div>
                      <p className="font-medium">Swap</p>
                      <p className="text-sm text-text-secondary">Exchange tokens</p>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* How to Earn */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <h3 className="font-bold mb-4">How to Earn Points</h3>
        <div className="space-y-3">
          {[
            'Make predictions and win',
            'Daily login bonuses',
            'Win streak rewards',
            'Community contributions',
            'Tournament prizes',
            'Connect wallet for blockchain rewards'
          ].map((tip, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Points
