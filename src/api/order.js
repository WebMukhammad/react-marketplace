import { serializeQueryParams } from './helper'
import OrderSerializer from 'src/serializer/Order'
import api from '.'

export async function get({ page = 1, perPage = 50 } = {}) {
  const result = await api.get(
    `/orders${serializeQueryParams({
      page,
      per_page: perPage
    })}`
  )
  return result?.map((el) => OrderSerializer(el)) || []
}
export async function search({ page = 1, perPage = 50, state }) {
  const result = await api.get(
    `/orders/search${serializeQueryParams({
      page,
      per_page: perPage,
      state
    })}`
  )

  return result?.map((el) => OrderSerializer(el)) || []
}
export function getByID({ id } = {}) {
  return api.get(`/orders/${id}`)
}
export async function orderPage(data) {
  const type = data.state === 'all' ? get : search
  const list = await type(data)

  return {
    list
  }
}
