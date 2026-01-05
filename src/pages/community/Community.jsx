import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  MessageSquare,
  TrendingUp,
  Users,
  Award,
  Filter,
  Search,
  Crown,
  ThumbsUp,
  MessageCircle,
  Share2
} from 'lucide-react'
import PostComposer from '../../components/community/PostComposer'
import PostCard from '../../components/community/PostCard'
import TrendingTopics from '../../components/community/TrendingTopics'
import StatCard from '../../components/common/StatCard'

const Community = () => {
  const [activeTab, setActiveTab] = useState('trending')
  const [searchQuery, setSearchQuery] = useState('')

  const tabs = [
    { id: 'trending', name: 'Trending', icon: <TrendingUp size={18} /> },
    { id: 'following', name: 'Following', icon: <Users size={18} /> },
    { id: 'premium', name: 'Premium', icon: <Crown size={18} /> },
    { id: 'my-posts', name: 'My Posts', icon: <MessageSquare size={18} /> }
  ]

  const communityStats = [
    { title: 'Active Users', value: '1.2K', icon: <Users />, color: 'blue' },
    { title: 'Daily Posts', value: '543', icon: <MessageSquare />, color: 'green' },
    { title: 'Accuracy Rate', value: '89%', icon: <Award />, color: 'yellow' },
    { title: 'Top Predictors', value: '42', icon: <Crown />, color: 'purple' }
  ]

  const trendingPosts = [
    {
      id: 1,
      author: {
        name: 'Juma_Analytics',
        avatar: 'JA',
        premium: true,
        rank: '#12'
      },
      content: 'Gor Mahia\'s away form is shaky, but Leopards missing 3 key defenders makes value on away win. Stats suggest 2-1 to Gor.',
      likes: 124,
      comments: 32,
      shares: 8,
      timestamp: '2 hours ago',
      tags: ['#MashemejiDerby', '#KPL', '#Analysis']
    },
    {
      id: 2,
      author: {
        name: 'PredictorPro',
        avatar: 'PP',
        premium: true,
        rank: '#5'
      },
      content: 'UFC 305: Adesanya\'s striking accuracy vs Du Plessis grappling. Round 3 TKO for the champ based on recent performances.',
      likes: 89,
      comments: 24,
      shares: 5,
      timestamp: '4 hours ago',
      tags: ['#UFC305', '#Adesanya', '#MMA']
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Community</h1>
          <p className="text-text-secondary mt-2">
            Connect with fellow predictors, share insights, and discuss strategies
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={20} />
            <input
              type="text"
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-card border border-card rounded-xl text-white w-full md:w-64"
            />
          </div>
          <button className="btn-secondary flex items-center space-x-2">
            <Filter size={18} />
            <span>Filter</span>
          </button>
        </div>
      </motion.div>

      {/* Community Stats */}
      <div className="grid-dashboard">
        {communityStats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Trending Topics */}
        <div className="lg:col-span-1">
          <TrendingTopics />
        </div>

        {/* Main Content - Posts */}
        <div className="lg:col-span-3 space-y-6">
          {/* Tabs */}
          <div className="card p-4">
            <div className="flex space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'text-text-secondary hover:text-white hover:bg-hover'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Post Composer */}
          <PostComposer />

          {/* Posts */}
          <div className="space-y-4">
            {trendingPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <PostCard post={post} />
              </motion.div>
            ))}
          </div>

          {/* Community Guidelines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6"
          >
            <h3 className="font-bold text-lg mb-4">Community Guidelines</h3>
            <ul className="space-y-3 text-text-secondary">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <span>Share data-backed predictions and analysis</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <span>Respect other members' opinions and analysis</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <span>No spam, self-promotion, or inappropriate content</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <span>Cite sources when sharing external data or statistics</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Community