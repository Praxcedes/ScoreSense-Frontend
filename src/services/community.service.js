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
  async getPosts({ page = 1, perPage = 20, userId = null } = {}) {
    const params = { page, per_page: perPage }
    if (userId) {
      params.user_id = userId
    }
    return COMMUNITY_API.get('/api/community/posts', { params })
  },

  async createPost({ content, mediaUrl = null, postType = 'text' }) {
    const payload = {
      content,
      media_url: mediaUrl,
      post_type: postType
    }
    return COMMUNITY_API.post('/api/community/posts', payload)
  },

  async getTrendingTopics() {
    return COMMUNITY_API.get('/api/community/trending')
  },

  async getUserStats() {
    return COMMUNITY_API.get('/api/community/user/stats')
  }
}
