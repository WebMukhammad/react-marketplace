import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
})

api.CancelToken = axios.CancelToken
api.isCancel = axios.isCancel

api.interceptors.request.use((config) => {
  const { token } = JSON.parse(localStorage.getItem('state') || '{}')
  if (token) {
    config.headers.common['Authorization'] = `Bearer ${token.access}`
  }
  return config
})

api.interceptors.response.use((response) => {
  return response.data
})

export default api
