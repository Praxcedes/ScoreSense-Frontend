import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ThumbsUp, 
  MessageCircle, 
  Share2, 
  MoreVertical,
  Bookmark,
  Flag,
  Crown,
  TrendingUp
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { toast } from 'react-hot-toast'

const PostCard = ({ post }) => {
  const { user } = useAuth()
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [comment, setComment] = useState('')
  const [showComments, setShowComments] = useState(false)

  // Default post data
  const defaultPost = {
    id: 1,
    author: {
      name: 'Juma_Analytics',
      avatar: 'JA',
      premium: true,
      rank: '#12'
    },
    content: 'Gor Mahia\'s away form is shaky, but AFC Leopards missing 3 key defenders makes value on away win. Recent stats suggest 2-1 to Gor. What are your thoughts?',
    likes: 124,
    comments: 32,
    shares: 8,
    timestamp: '2 hours ago',
    tags: ['#MashemejiDerby', '#KPL', '#Analysis', '#Prediction']
  }

  const postData = post || defaultPost

  const handleLike = () => {
    setLiked(!liked)
    toast.success(liked ? 'Like removed' : 'Post liked!')
  }

  const handleBookmark = () => {
    setBookmarked(!bookmarked)
    toast.success(bookmarked ? 'Removed from bookmarks' : 'Bookmarked!')
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('Link copied to clipboard!')
  }

  const handleComment = (e) => {
    e.preventDefault()
    if (comment.trim()) {
      toast.success('Comment added!')
      setComment('')
    }
  }

  const handleReport = () => {
    setShowOptions(false)
    toast.success('Report submitted for review')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-6"
    >
      {/* Post Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {/* Avatar */}
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-green-400 rounded-full flex items-center justify-center">
              <span className="font-bold text-white">{postData.author.avatar}</span>
            </div>
            {postData.author.premium && (
              <div className="absolute -top-1 -right-1">
                <Crown className="text-yellow-400" size={16} />
              </div>
            )}
          </div>

          {/* Author Info */}
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="font-bold">{postData.author.name}</h4>
              {postData.author.premium && (
                <span className="premium-badge">PREMIUM</span>
              )}
              <span className="text-sm text-primary font-medium">
                Rank {postData.author.rank}
              </span>
            </div>
            <p className="text-sm text-text-secondary">{postData.timestamp}</p>
          </div>
        </div>

        {/* Options */}
        <div className="relative">
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="p-2 hover:bg-hover rounded-lg"
          >
            <MoreVertical className="text-text-secondary" size={20} />
          </button>

          {showOptions && (
            <div className="absolute right-0 mt-2 w-48 bg-surface border border-card rounded-xl shadow-lg z-10">
              <button
                onClick={handleBookmark}
                className="w-full text-left px-4 py-3 hover:bg-hover rounded-t-xl flex items-center space-x-3"
              >
                <Bookmark size={18} />
                <span>{bookmarked ? 'Remove Bookmark' : 'Bookmark'}</span>
              </button>
              <button
                onClick={handleReport}
                className="w-full text-left px-4 py-3 hover:bg-hover rounded-b-xl flex items-center space-x-3"
              >
                <Flag size={18} />
                <span>Report Post</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <p className="text-text-primary whitespace-pre-line">{postData.content}</p>
      </div>

      {/* Tags */}
      {postData.tags && postData.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {postData.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-card text-text-secondary rounded-lg text-sm hover:bg-hover cursor-pointer transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center justify-between mb-6 pt-4 border-t border-card">
        <div className="flex items-center space-x-6">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 ${
              liked ? 'text-primary' : 'text-text-secondary hover:text-white'
            }`}
          >
            <ThumbsUp size={20} />
            <span className="font-medium">{postData.likes + (liked ? 1 : 0)}</span>
          </button>
          
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 text-text-secondary hover:text-white"
          >
            <MessageCircle size={20} />
            <span className="font-medium">{postData.comments}</span>
          </button>
          
          <button
            onClick={handleShare}
            className="flex items-center space-x-2 text-text-secondary hover:text-white"
          >
            <Share2 size={20} />
            <span className="font-medium">{postData.shares}</span>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <TrendingUp className="text-green-400" size={16} />
          <span className="text-sm text-green-400">87% accuracy</span>
        </div>
      </div>

      {/* Comment Input */}
      <div className="pt-4 border-t border-card">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-card rounded-full flex items-center justify-center">
            <span className="font-bold">{user?.username?.charAt(0) || 'U'}</span>
          </div>
          <form onSubmit={handleComment} className="flex-1 flex">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 bg-card border border-card rounded-l-xl px-4 py-3 text-white placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 px-6 py-3 rounded-r-xl font-medium"
            >
              Post
            </button>
          </form>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 pt-4 border-t border-card"
        >
          <h5 className="font-bold mb-3">Recent Comments</h5>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start space-x-3 p-3 bg-card rounded-xl">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">U{i}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">User{i}</span>
                    <span className="text-xs text-text-secondary">1 hour ago</span>
                  </div>
                  <p className="text-sm text-text-secondary mt-1">
                    Great analysis! I agree with your prediction.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default PostCard