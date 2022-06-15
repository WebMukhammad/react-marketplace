import { serializeQueryParams } from './helper'
import RefundSerializer from 'src/serializer/Refund'
import RefundExtendedSerializer from 'src/serializer/RefundExtended'
import api from '.'

export async function get({ page = 1, perPage = 50, startDate, endDate } = {}) {
  const result = await api.get(
    `/refunds${serializeQueryParams({
      page,
      per_page: perPage,
      start_date: startDate,
      end_date: endDate
    })}`
  )

  return result?.map((el) => RefundSerializer(el)) || []
}
export function confirm({ id } = {}) {
  api.post(`/refunds/confirm/${id}`)
}
export async function getByID({ id } = {}) {
  const result = await api.get(`/refunds/${id}`)

  return RefundExtendedSerializer(result || {})
}
