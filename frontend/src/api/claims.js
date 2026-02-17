import { api } from './client'

export const claimsApi = {
  list: () => api.get('/claims/').then((res) => res.data),
  stats: () => api.get('/claims/stats').then((res) => res.data),
  get: (id) => api.get(`/claims/${id}`).then((res) => res.data),
  createHealth: (formData) =>
    api.post('/claims/health/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((res) => res.data),
  createLife: (formData) =>
    api.post('/claims/life/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((res) => res.data),
}
