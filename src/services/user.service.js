import api from './api'

const normalizeUser = (user = {}) => ({
  ...user,
  avatarUrl: user.avatarUrl || user.avatar_url || user.avatar
})

export const userService = {
  async getCurrentUser() {
    const response = await api.get('/users/me')
    if (response?.user) {
      return { ...response, user: normalizeUser(response.user) }
    }
    return response
  },

  async updateProfile(payload) {
    const response = await api.patch('/users/me', payload)
    if (response?.user) {
      return { ...response, user: normalizeUser(response.user) }
    }
    return response
  },

  async uploadAvatar(file) {
    const formData = new FormData()
    formData.append('avatar', file)
    formData.append('image', file)
    const response = await api.post('/users/me/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response
  },

  async updatePassword(payload) {
    return api.patch('/users/me/password', payload)
  }
}
