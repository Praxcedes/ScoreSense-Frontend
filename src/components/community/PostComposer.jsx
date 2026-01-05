import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Send, 
  Image, 
  BarChart3, 
  Hash,
  X,
  Smile
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { toast } from 'react-hot-toast'

const PostComposer = ({ onPostCreated }) => {
  const { user } = useAuth()
  const [content, setContent] = useState('')
  const [tags, setTags] = useState([])
  const [currentTag, setCurrentTag] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showStats, setShowStats] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!content.trim()) {
      toast.error('Please write something to post')
      return
    }

    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      const newPost = {
        id: Date.now(),
        author: {
          name: user?.username || 'Anonymous',
          avatar: user?.username?.charAt(0) || 'A',
          premium: user?.premium || false,
          rank: user?.rank || '#999'
        },
        content,
        tags,
        likes: 0,
        comments: 0,
        shares: 0,
        timestamp: 'Just now'
      }

      onPostCreated?.(newPost)
      setContent('')
      setTags([])
      setIsSubmitting(false)
      toast.success('Post published successfully!')
    }, 1000)
  }

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()])
      setCurrentTag('')
    }
  }

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const suggestedTags = [
    '#KPL',
    '#PremierLeague',
    '#UFC',
    '#Analysis',
    '#Prediction',
    '#Stats'
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-6"
    >
      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-green-400 rounded-full flex items-center justify-center">
          <span className="font-bold text-white">
            {user?.username?.charAt(0) || 'U'}
          </span>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <h3 className="font-bold mb-4">Share your analysis</h3>
          
          <form onSubmit={handleSubmit}>
            {/* Textarea */}
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's your prediction or analysis? Share stats, insights, or ask a question..."
              className="w-full h-32 bg-card border border-card rounded-xl p-4 text-white placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none"
              maxLength={500}
            />

            {/* Character Counter */}
            <div className="flex justify-end mt-2">
              <span className={`text-sm ${
                content.length > 450 ? 'text-red-400' : 'text-text-secondary'
              }`}>
                {content.length}/500
              </span>
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center bg-primary/20 text-primary px-3 py-1 rounded-lg text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 hover:text-primary/80"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Suggested Tags */}
            <div className="mt-4">
              <div className="text-sm text-text-secondary mb-2">Suggested tags:</div>
              <div className="flex flex-wrap gap-2">
                {suggestedTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      if (!tags.includes(tag)) {
                        setTags([...tags, tag])
                      }
                    }}
                    className="px-3 py-1 bg-card text-text-secondary hover:text-white rounded-lg text-sm transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Tag Input */}
            <div className="mt-4">
              <div className="flex items-center space-x-2">
                <Hash size={18} className="text-text-secondary" />
                <input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="Add custom tag..."
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-text-secondary"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="text-primary hover:text-primary/80"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-card">
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  className="p-2 hover:bg-hover rounded-lg transition-colors"
                  title="Add image"
                >
                  <Image size={20} className="text-text-secondary" />
                </button>
                <button
                  type="button"
                  onClick={() => setShowStats(!showStats)}
                  className="p-2 hover:bg-hover rounded-lg transition-colors"
                  title="Add stats"
                >
                  <BarChart3 size={20} className="text-text-secondary" />
                </button>
                <button
                  type="button"
                  className="p-2 hover:bg-hover rounded-lg transition-colors"
                  title="Add emoji"
                >
                  <Smile size={20} className="text-text-secondary" />
                </button>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !content.trim()}
                className="btn-primary flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Publishing...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Publish</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Stats Toggle */}
          {showStats && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 p-4 bg-card rounded-xl"
            >
              <h4 className="font-bold mb-3">Add Statistics</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-text-secondary mb-1">Win Probability</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="65"
                    className="w-full bg-transparent border border-card rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-1">Stake Amount</label>
                  <input
                    type="number"
                    placeholder="50"
                    className="w-full bg-transparent border border-card rounded-lg px-3 py-2 text-white"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default PostComposer