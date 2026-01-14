import React, { useCallback, useEffect, useMemo, useState } from 'react'
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
import TrendingTopics from './TrendingTopics'
import StatCard from '../../components/common/StatCard'
import { communityService } from '../../services/community.service'
import { useAuth } from '../../hooks/useAuth'

const Community = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('trending')
  const [searchQuery, setSearchQuery] = useState('')
  const [posts, setPosts] = useState([])
  const [trendingTopics, setTrendingTopics] = useState([])
  const [pagination, setPagination] = useState(null)
  const [loadingPosts, setLoadingPosts] = useState(true)
  const [loadingTrending, setLoadingTrending] = useState(true)
  const [stats, setStats] = useState(null)
  const [error, setError] = useState(null)

  const tabs = [
    { id: 'trending', name: 'Trending', icon: <TrendingUp size={18} /> },
    { id: 'following', name: 'Following', icon: <Users size={18} /> },
    { id: 'premium', name: 'Premium', icon: <Crown size={18} /> },
    { id: 'my-posts', name: 'My Posts', icon: <MessageSquare size={18} /> }
  ]

  const communityStats = useMemo(() => {
    if (!stats) return []
    return [
      { title: 'Posts', value: stats.posts_count ?? 0, icon: <MessageSquare />, color: 'blue' },
      { title: 'Followers', value: stats.followers_count ?? 0, icon: <Users />, color: 'green' },
      { title: 'Following', value: stats.following_count ?? 0, icon: <Award />, color: 'yellow' },
      { title: 'Total Likes', value: stats.total_likes ?? 0, icon: <Crown />, color: 'purple' }
    ]
  }, [stats])

  const fetchPosts = useCallback(async () => {
    try {
      setLoadingPosts(true)
      const response = await communityService.getPosts({ page: 1, perPage: 20 })
      if (response?.success) {
        setPosts(response.posts || [])
        setPagination(response.pagination || null)
      } else {
        setError(response?.error || 'Failed to load posts')
      }
    } catch (fetchError) {
      setError(fetchError?.error || fetchError?.message || 'Failed to load posts')
    } finally {
      setLoadingPosts(false)
    }
  }, [])

  const fetchTrending = useCallback(async () => {
    try {
      setLoadingTrending(true)
      const response = await communityService.getTrendingTopics()
      if (response?.success) {
        const topics = (response.trending || []).map((topic) => ({
          id: topic.id,
          title: topic.topic,
          posts: topic.post_count,
          engagement: topic.trending_score,
          trend: topic.trending_score > 0 ? 'up' : 'steady',
          change: topic.trending_score,
          hot: topic.trending_score >= 10,
          icon: '🔥'
        }))
        setTrendingTopics(topics)
      } else {
        setError(response?.error || 'Failed to load trending topics')
      }
    } catch (fetchError) {
      setError(fetchError?.error || fetchError?.message || 'Failed to load trending topics')
    } finally {
      setLoadingTrending(false)
    }
  }, [])

  const fetchStats = useCallback(async () => {
    if (!user) return
    try {
      const response = await communityService.getUserStats()
      if (response?.success) {
        setStats(response.stats)
      }
    } catch (fetchError) {
      console.warn('Failed to load community stats', fetchError)
    }
  }, [user])

  useEffect(() => {
    fetchPosts()
    fetchTrending()
    fetchStats()
  }, [fetchPosts, fetchTrending, fetchStats])

  const filteredPosts = useMemo(() => {
    const base = posts.filter((post) => {
      if (!searchQuery) return true
      const query = searchQuery.toLowerCase()
      return (post.content || '').toLowerCase().includes(query)
    })

    if (activeTab === 'my-posts' && user?.id) {
      return base.filter((post) => post.user_id === user.id || post.author?.id === user.id)
    }

    if (activeTab === 'premium') {
      return base.filter((post) => post.author?.premium || post.author?.is_premium)
    }

    return base
  }, [activeTab, posts, searchQuery, user])

  const handlePostCreated = (post) => {
    setPosts((prev) => [post, ...prev])
  }

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

      {error && (
        <div className="card p-4 text-red-400 border border-red-500/30">
          {error}
        </div>
      )}

      {/* Community Stats */}
      {communityStats.length > 0 && (
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
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Trending Topics */}
        <div className="lg:col-span-1">
          <TrendingTopics
            topics={trendingTopics}
            loading={loadingTrending}
            onRefresh={fetchTrending}
          />
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
          <PostComposer onPostCreated={handlePostCreated} />

          {/* Posts */}
          <div className="space-y-4">
            {loadingPosts ? (
              <div className="card p-6 text-text-secondary">Loading posts...</div>
            ) : filteredPosts.length === 0 ? (
              <div className="card p-6 text-text-secondary">No posts yet.</div>
            ) : (
              filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <PostCard post={post} />
                </motion.div>
              ))
            )}
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
