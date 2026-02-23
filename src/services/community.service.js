import axios from 'axios'

const RAW_BASE_URL = import.meta.env.VITE_API_URL || 'https://scoresense-africa-backend.onrender.com'
const BASE_URL = import.meta.env.DEV ? '' : RAW_BASE_URL.replace(/\/api\/?$/, '')

const COMMUNITY_API = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

COMMUNITY_API.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

COMMUNITY_API.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error.response?.data || error)
)

export const communityService = {
  normalizePost(post = {}) {
    const author = post.author || post.user || {}
    const authorDisplayName = post.user_display_name || author.user_display_name || author.name || author.username
    const authorLocation = post.user_location || author.user_location || author.location
    const authorAvatar = post.user_avatar || author.user_avatar || author.avatar_url || author.avatar

    return {
      ...post,
      user_display_name: authorDisplayName,
      user_location: authorLocation,
      user_avatar: authorAvatar,
      author: {
        ...author,
        name: authorDisplayName,
        username: author.username || authorDisplayName,
        location: authorLocation,
        avatar_url: author.avatar_url || authorAvatar,
        avatar: author.avatar || authorAvatar
      }
    }
  },

  async getPosts({ page = 1, perPage = 20, userId = null } = {}) {
    const params = { page, per_page: perPage }
    if (userId) {
      params.user_id = userId
    }
    const response = await COMMUNITY_API.get('/api/community/posts', { params })
    if (response?.posts) {
      return { ...response, posts: response.posts.map(this.normalizePost) }
    }
    return response
  },

  async createPost({ content, mediaUrl = null, postType = 'text' }) {
    const payload = {
      content,
      media_url: mediaUrl,
      post_type: postType
    }
    const response = await COMMUNITY_API.post('/api/community/posts', payload)
    if (response?.post) {
      return { ...response, post: this.normalizePost(response.post) }
    }
    return response
  },

  async getTrendingTopics() {
    return COMMUNITY_API.get('/api/community/trending')
  },

  async getUserStats() {
    return COMMUNITY_API.get('/api/community/user/stats')
  },

  async getComments(postId) {
    return COMMUNITY_API.get(`/api/community/posts/${postId}/comments`)
  },

  async addComment({ postId, content }) {
    return COMMUNITY_API.post('/api/community/comments', {
      post_id: postId,
      content
    })
  },

  async toggleLike(postId) {
    return COMMUNITY_API.post(`/api/community/posts/${postId}/like`)
  }
}
