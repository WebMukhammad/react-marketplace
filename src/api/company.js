import api from '.'
import { getFormData } from './helper'

export function get() {
  return api.get('/stores/current')
}
export function send({ data } = {}) {
  return api.post('/stores/current', data)
}
export function sendDocuments({ name, fileList } = {}) {
  return api.post(
    '/documents',
    getFormData({
      name,
      docs: fileList
    })
  )
}
