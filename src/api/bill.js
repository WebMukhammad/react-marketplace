import { serializeQueryParams } from './helper'
import BillSerializer from 'src/serializer/Bill'
import api from '.'

export default class Bill {
  static async get({ page = 1, perPage = 50 } = {}) {
    const result = await api.get(
      `/amounts${serializeQueryParams({
        page,
        per_page: perPage
      })}`
    )
    return result?.map((el) => Bill(BillSerializer(el))) || []
  }
}
