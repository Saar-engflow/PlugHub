import axios from 'axios'

const api = axios.create({
  baseURL: '/api'
})

api.interceptors.request.use(config => {
  const raw = localStorage.getItem('plughub_auth')
  if (raw) {
    const { token } = JSON.parse(raw)
    if (token) config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
