import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  ArrowDownRight,
  Gift,
  TrendingUp,
  History,
  CreditCard,
  Plus,
  Award,
  Zap
} from 'lucide-react'
import { usePoints } from '../../hooks/usePoints'

const Points = () => {
  const { points, transactions, claimBonus } = usePoints()
  const [activeTab, setActiveTab] = useState('transactions')

  const tabs = [
    { id: 'transactions', name: 'Transactions' },
    { id: 'rewards', name: 'Rewards' },
    { id: 'leaderboard', name: 'Leaderboard' },
    { id: 'marketplace', name: 'Marketplace' }
  ]

  const rewards = [
    { id: 1, name: 'Daily Login', amount: 50, icon: <Gift />, color: 'green', claimed: true },
    { id: 2, name: 'Win Streak', amount: 100, icon: <Zap />, color: 'yellow', claimed: false },
    { id: 3, name: 'Perfect Week', amount: 200, icon: <Award />, color: 'purple', claimed: false },
    { id: 4, name: 'Community', amount: 75, icon: <TrendingUp />, color: 'blue', claimed: true }
  ]

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
            <h1 className="text-2xl md:text-3xl font-bold">Virtual Economy</h1>
            <p className="text-text-secondary mt-2">
              Earn, spend, and trade points. Your key to premium features and rewards.
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-center md:text-right">
            <div className="text-5xl font-bold text-primary">{points.toLocaleString()}</div>
            <div className="text-text-secondary">Total Points</div>
            <div className="flex items-center justify-center md:justify-end space-x-2 mt-2">
              <ArrowUpRight className="text-green-400" size={16} />
              <span className="text-green-400 text-sm">+450 this week</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Rewards */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card p-6"
          >
            {/* Tabs */}
            <div className="flex space-x-1 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-2.5 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'text-text-secondary hover:text-white hover:bg-hover'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Transactions Table */}
            {activeTab === 'transactions' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-card">
                      <th className="text-left py-3 text-text-secondary font-medium">Description</th>
                      <th className="text-left py-3 text-text-secondary font-medium">Date</th>
                      <th className="text-left py-3 text-text-secondary font-medium">Amount</th>
                      <th className="text-left py-3 text-text-secondary font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.slice(0, 5).map((tx) => (
                      <tr key={tx.id} className="border-b border-card hover:bg-hover">
                        <td className="py-3">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${
                              tx.type === 'win' ? 'bg-green-500/20' :
                              tx.type === 'bonus' ? 'bg-yellow-500/20' :
                              'bg-blue-500/20'
                            }`}>
                              {tx.type === 'win' ? <ArrowUpRight className="text-green-400" size={16} /> :
                               tx.type === 'bonus' ? <Gift className="text-yellow-400" size={16} /> :
                               <CreditCard className="text-blue-400" size={16} />}
                            </div>
                            <div>
                              <p className="font-medium">{tx.description}</p>
                              <p className="text-sm text-text-secondary">{tx.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 text-text-secondary">{tx.date}</td>
                        <td className={`py-3 font-bold ${
                          tx.amount > 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {tx.amount > 0 ? '+' : ''}{tx.amount} PTS
                        </td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            tx.status === 'completed' ? 'status-win' :
                            tx.status === 'pending' ? 'status-pending' :
                            'status-loss'
                          }`}>
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Rewards Grid */}
            {activeTab === 'rewards' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rewards.map((reward) => (
                  <div
                    key={reward.id}
                    className={`p-4 rounded-xl border ${
                      reward.claimed
                        ? 'bg-green-500/10 border-green-500/30'
                        : 'bg-card border-card'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg bg-${reward.color}-500/20`}>
                          {reward.icon}
                        </div>
                        <div>
                          <h4 className="font-medium">{reward.name}</h4>
                          <p className="text-sm text-text-secondary">{reward.amount} PTS</p>
                        </div>
                      </div>
                      <button
                        onClick={() => !reward.claimed && claimBonus(reward.id)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium ${
                          reward.claimed
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-primary text-white hover:bg-primary/90'
                        }`}
                        disabled={reward.claimed}
                      >
                        {reward.claimed ? 'Claimed' : 'Claim'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Right Column - Stats & Info */}
        <div className="space-y-6">
          {/* Points Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card p-6"
          >
            <h3 className="font-bold mb-4">Points Statistics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Total Earned</span>
                <span className="font-bold">3,240 PTS</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Total Spent</span>
                <span className="font-bold">790 PTS</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Net Profit</span>
                <span className="font-bold text-green-400">+2,450 PTS</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Avg. Daily</span>
                <span className="font-bold">+87 PTS</span>
              </div>
            </div>
          </motion.div>

          {/* How to Earn */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6"
          >
            <h3 className="font-bold mb-4">How to Earn Points</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">Make Predictions</p>
                  <p className="text-sm text-text-secondary">Stake points to win more</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">Daily Login</p>
                  <p className="text-sm text-text-secondary">Log in daily for bonus points</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">Win Streaks</p>
                  <p className="text-sm text-text-secondary">Bonus for consecutive wins</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">Community</p>
                  <p className="text-sm text-text-secondary">Earn for helpful posts</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Points