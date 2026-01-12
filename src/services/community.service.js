import api from './api'

const tryPaths = async (paths, requestFn, isValid) => {
  let lastResponse = null
  for (const path of paths) {
    const response = await requestFn(path)
    lastResponse = response
    if (isValid(response)) {
      return response
    }
  }
  return lastResponse
}

export const communityService = {
  async getPosts({ page = 1, perPage = 20, userId = null } = {}) {
    const params = { page, per_page: perPage }
    if (userId) {
      params.user_id = userId
    }
    return tryPaths(
      ['/community/posts', '/posts'],
      (path) => api.get(path, { params }),
      (response) => Array.isArray(response?.posts)
    )
  },

  async createPost({ content, mediaUrl = null, postType = 'text' }) {
    const payload = {
      content,
      media_url: mediaUrl,
      post_type: postType
    }
    return tryPaths(
      ['/community/posts', '/posts'],
      (path) => api.post(path, payload),
      (response) => Boolean(response?.post)
    )
  },

  async getTrendingTopics() {
    return tryPaths(
      ['/community/trending', '/trending'],
      (path) => api.get(path),
      (response) => Array.isArray(response?.trending)
    )
  },

  async getUserStats() {
    return tryPaths(
      ['/community/user/stats', '/user/stats'],
      (path) => api.get(path),
      (response) => Boolean(response?.stats)
    )
  }
}
