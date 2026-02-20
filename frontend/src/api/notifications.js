import { api } from './client'

export const notificationsApi = {
  list: () => api.get('/notifications').then((r) => r.data),
  unreadCount: () => api.get('/notifications/unread-count').then((r) => r.data),
  markAsRead: (id) => api.patch(`/notifications/${id}/read`).then((r) => r.data),
}
