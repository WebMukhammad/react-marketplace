import { serializeQueryParams } from './helper'
import NotificationSerializer from 'src/serializer/Notification'
import api from '.'

export async function get({ page = 1, perPage = 50 } = {}) {
  const list = await api.get(
    `/notifications${serializeQueryParams({
      page,
      per_page: perPage
    })}`
  )
  return list?.length ? list.map((el) => NotificationSerializer(el)) : []
}

export async function getCount() {
  return (await api.get('/notifications/unread-count'))?.['unread-count'] || 0
}

export function mark({ notificationIds } = {}) {
  return api.post('/notifications/mark-as-read', { notificationIds })
}

export function remove() {
  return api.post('/notifications/delete')
}

export async function getData({ page = 1, perPage = 50 } = {}) {
  const list = await get({ page, perPage })
  const count = await getCount()
  return {
    list,
    count
  }
}
