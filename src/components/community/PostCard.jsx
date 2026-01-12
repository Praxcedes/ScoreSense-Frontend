import React, { useMemo, useState } from 'react'
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

  const postData = post || {}
  const author = postData.author || postData.user || {}
  const authorName = author.name || author.username || 'Unknown'
  const authorAvatar = author.avatar || authorName.charAt(0)
  const authorPremium = Boolean(author.premium || author.is_premium)
  const authorRank = author.rank || author.user_rank
  const timestamp = postData.timestamp || postData.created_at || 'Just now'
  const tags = postData.tags || []
  const likesCount = postData.likes ?? postData.likes_count ?? 0
  const commentsCount = postData.comments ?? postData.comments_count ?? 0
  const sharesCount = postData.shares ?? postData.shares_count ?? 0

  const displayTimestamp = useMemo(() => {
    if (!timestamp) return 'Just now'
    return timestamp
  }, [timestamp])

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
              <span className="font-bold text-white">{authorAvatar}</span>
            </div>
            {authorPremium && (
              <div className="absolute -top-1 -right-1">
                <Crown className="text-yellow-400" size={16} />
              </div>
            )}
          </div>

          {/* Author Info */}
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="font-bold">{authorName}</h4>
              {authorPremium && (
                <span className="premium-badge">PREMIUM</span>
              )}
              {authorRank && (
                <span className="text-sm text-primary font-medium">
                  Rank {authorRank}
                </span>
              )}
            </div>
            <p className="text-sm text-text-secondary">{displayTimestamp}</p>
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
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
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
            <span className="font-medium">{likesCount + (liked ? 1 : 0)}</span>
          </button>
          
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 text-text-secondary hover:text-white"
          >
            <MessageCircle size={20} />
            <span className="font-medium">{commentsCount}</span>
          </button>
          
          <button
            onClick={handleShare}
            className="flex items-center space-x-2 text-text-secondary hover:text-white"
          >
            <Share2 size={20} />
            <span className="font-medium">{sharesCount}</span>
          </button>
        </div>

        {postData.accuracy && (
          <div className="flex items-center space-x-2">
            <TrendingUp className="text-green-400" size={16} />
            <span className="text-sm text-green-400">{postData.accuracy}% accuracy</span>
          </div>
        )}
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
          <h5 className="font-bold mb-3">Comments</h5>
          <div className="text-sm text-text-secondary">
            Comments are not available yet.
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default PostCard
