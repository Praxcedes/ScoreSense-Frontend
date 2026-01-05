import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  TrendingUp, 
  Flame, 
  Hash, 
  Users,
  Clock,
  ChevronRight,
  Eye,
  MessageSquare,
  Zap,
  Crown
} from 'lucide-react'
import { useWebSocket } from '../../hooks/useWebSocket'

const TrendingTopics = () => {
  const { isConnected } = useWebSocket()
  const [activeTab, setActiveTab] = useState('trending')
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)

  // Default trending topics
  const defaultTopics = {
    trending: [
      {
        id: 1,
        title: '#MashemejiDerby',
        category: 'Football',
        posts: 245,
        engagement: 89,
        trend: 'up',
        change: 12,
        hot: true,
        icon: '🔥'
      },
      {
        id: 2,
        title: 'Adesanya vs Du Plessis',
        category: 'MMA',
        posts: 189,
        engagement: 76,
        trend: 'up',
        change: 8,
        hot: true,
        icon: '🥊'
      },
      {
        id: 3,
        title: 'Man City vs Arsenal',
        category: 'Premier League',
        posts: 156,
        engagement: 65,
        trend: 'steady',
        change: 2,
        hot: false,
        icon: '⚽'
      },
      {
        id: 4,
        title: '#KPLPredictions',
        category: 'Football',
        posts: 98,
        engagement: 54,
        trend: 'up',
        change: 15,
        hot: false,
        icon: '📊'
      },
      {
        id: 5,
        title: 'NBA Playoffs',
        category: 'Basketball',
        posts: 87,
        engagement: 45,
        trend: 'down',
        change: -3,
        hot: false,
        icon: '🏀'
      }
    ],
    rising: [
      {
        id: 6,
        title: 'UFC 305 Preview',
        category: 'MMA',
        posts: 45,
        engagement: 92,
        trend: 'up',
        change: 28,
        hot: true,
        icon: '👊'
      },
      {
        id: 7,
        title: '#TuskerFC',
        category: 'Football',
        posts: 32,
        engagement: 78,
        trend: 'up',
        change: 21,
        hot: false,
        icon: '⚽'
      },
      {
        id: 8,
        title: 'Tennis: Djokovic Form',
        category: 'Tennis',
        posts: 28,
        engagement: 65,
        trend: 'steady',
        change: 5,
        hot: false,
        icon: '🎾'
      }
    ],
    premium: [
      {
        id: 9,
        title: 'Insider: Transfer Rumors',
        category: 'Football',
        posts: 56,
        engagement: 95,
        trend: 'up',
        change: 18,
        hot: true,
        premium: true,
        icon: '🔒'
      },
      {
        id: 10,
        title: 'Advanced Stats: xG Analysis',
        category: 'Analytics',
        posts: 42,
        engagement: 88,
        trend: 'steady',
        change: 7,
        hot: false,
        premium: true,
        icon: '📈'
      }
    ]
  }

  useEffect(() => {
    // Simulate API fetch
    setLoading(true)
    setTimeout(() => {
      setTopics(defaultTopics[activeTab])
      setLoading(false)
    }, 500)
  }, [activeTab])

  const tabs = [
    { id: 'trending', name: 'Trending', icon: <TrendingUp size={16} /> },
    { id: 'rising', name: 'Rising', icon: <Flame size={16} /> },
    { id: 'premium', name: 'Premium', icon: <Crown size={16} /> }
  ]

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-green-400'
      case 'down': return 'text-red-400'
      default: return 'text-yellow-400'
    }
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return '↗'
      case 'down': return '↘'
      default: return '→'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="card p-6 sticky top-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold flex items-center space-x-2">
            <TrendingUp className="text-primary" size={20} />
            <span>Trending Topics</span>
          </h3>
          <p className="text-sm text-text-secondary mt-1">
            What the community is talking about
            {isConnected && <span className="text-primary ml-2">• Live</span>}
          </p>
        </div>
        <div className="flex items-center space-x-1">
          <Users size={16} className="text-text-secondary" />
          <span className="text-sm text-text-secondary">1.2K active</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-card p-1 rounded-xl mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-primary text-white'
                : 'text-text-secondary hover:text-white'
            }`}
          >
            {tab.icon}
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Loading State */}
      <AnimatePresence>
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-card rounded-lg animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-card rounded animate-pulse w-3/4" />
                  <div className="h-2 bg-card rounded animate-pulse w-1/2" />
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Topics List */}
            {topics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group p-4 bg-card hover:bg-hover rounded-xl cursor-pointer transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                        <span className="text-lg">{topic.icon}</span>
                      </div>
                      {topic.hot && (
                        <div className="absolute -top-1 -right-1">
                          <Flame className="text-orange-500" size={12} />
                        </div>
                      )}
                      {topic.premium && (
                        <div className="absolute -bottom-1 -right-1">
                          <Crown className="text-yellow-400" size={12} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold truncate">{topic.title}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs px-2 py-0.5 bg-surface rounded-full text-text-secondary">
                          {topic.category}
                        </span>
                        {topic.premium && (
                          <span className="text-xs px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded-full">
                            Premium
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-bold ${getTrendColor(topic.trend)}`}>
                      {getTrendIcon(topic.trend)} {Math.abs(topic.change)}%
                    </span>
                  </div>
                </div>

                {/* Engagement Metrics */}
                <div className="flex items-center justify-between text-sm text-text-secondary">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <MessageSquare size={14} />
                      <span>{topic.posts}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye size={14} />
                      <span>{topic.engagement}%</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 group-hover:text-primary transition-colors">
                    <span className="text-xs font-medium">Join</span>
                    <ChevronRight size={14} />
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="w-full bg-surface rounded-full h-1.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${topic.engagement}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      className={`h-1.5 rounded-full ${
                        topic.trend === 'up' ? 'bg-green-500' :
                        topic.trend === 'down' ? 'bg-red-500' :
                        'bg-yellow-500'
                      }`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Empty State */}
            {topics.length === 0 && (
              <div className="text-center py-8">
                <Hash className="mx-auto text-text-secondary" size={32} />
                <p className="text-text-secondary mt-3">No trending topics</p>
                <p className="text-sm text-text-secondary mt-1">
                  Check back later for new discussions
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Divider */}
      <div className="border-t border-card my-6" />

      {/* Quick Stats */}
      <div className="space-y-4">
        <h4 className="font-bold flex items-center space-x-2">
          <Zap size={16} />
          <span>Community Stats</span>
        </h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-card rounded-xl">
            <div className="text-2xl font-bold text-primary">1.2K</div>
            <div className="text-xs text-text-secondary mt-1">Active Users</div>
          </div>
          <div className="text-center p-3 bg-card rounded-xl">
            <div className="text-2xl font-bold text-green-400">89%</div>
            <div className="text-xs text-text-secondary mt-1">Accuracy Rate</div>
          </div>
          <div className="text-center p-3 bg-card rounded-xl">
            <div className="text-2xl font-bold text-purple-400">543</div>
            <div className="text-xs text-text-secondary mt-1">Daily Posts</div>
          </div>
          <div className="text-center p-3 bg-card rounded-xl">
            <div className="text-2xl font-bold text-yellow-400">42</div>
            <div className="text-xs text-text-secondary mt-1">Top Predictors</div>
          </div>
        </div>
      </div>

      {/* Refresh Button */}
      <button className="w-full mt-6 py-3 bg-surface hover:bg-hover rounded-xl font-medium transition-colors flex items-center justify-center space-x-2">
        <Clock size={16} />
        <span>Refresh Topics</span>
      </button>

      {/* Info Footer */}
      <div className="mt-6 pt-4 border-t border-card">
        <p className="text-xs text-text-secondary text-center">
          Topics update every 30 minutes • Based on engagement and activity
        </p>
      </div>
    </motion.div>
  )
}

export default TrendingTopics