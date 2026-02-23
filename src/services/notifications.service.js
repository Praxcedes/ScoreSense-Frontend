import api from './api'

export const notificationsService = {
  getNotifications(params = {}) {
    return api.get('/notifications', { params })
  },

  markRead(id) {
    return api.post('/notifications/read', { id })
  },

  markAllRead() {
    return api.post('/notifications/read-all')
  },

  deleteNotification(id) {
    return api.delete(`/notifications/${id}`)
  },

  clearAll() {
    return api.delete('/notifications')
  },

  getSettings() {
    return api.get('/notifications/settings')
  },

  updateSettings(settings) {
    return api.post('/notifications/settings', settings)
  }
}
