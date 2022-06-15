import { serializeQueryParams, getCancelToken } from './helper'
import DashboardProduct from '~/model/product/DashboardProduct'
import DashboardProductSerializer from 'src/serializer/product/DashboardProduct'
import DashboardTransaction from '~/model/DashboardTransaction'
import DashboardTransactionSerializer from 'src/serializer/DashboardTransaction'
import api from '.'

export async function get({ page = 1, perPage = 50, category, product, query, startDate, endDate, cancel } = {}) {
  try {
    const cancelToken = cancel
      ? getCancelToken({
          name: 'dashboardProduct',
          cancelToken: this.$axios.CancelToken
        })
      : null

    const result = await this.$axios.$get(
      `/analytics/product-orders${serializeQueryParams({
        page,
        q: query,
        per_page: perPage,
        category,
        product,
        start_date: startDate,
        end_date: endDate
      })}`,
      {
        cancelToken
      }
    )
    return result?.map((el) => DashboardProduct(DashboardProductSerializer(el))) || []
  } catch (e) {
    /**
     * Если мы отменяем запрос, то резолвим проммис в пустой объект
     */
    if (this.$axios.isCancel(e)) {
      return new Promise((resolve) => {})
    }
  }
}
export function getGeneral({ category, product, startDate, endDate } = {}) {
  return this.$axios.$get(
    `/analytics/general${serializeQueryParams({
      category,
      product,
      start_date: startDate,
      end_date: endDate
    })}`
  )
}
export function getSalesByCategories({ category, product, startDate, endDate } = {}) {
  return this.$axios.$get(
    `/analytics/sales-by-categories${serializeQueryParams({
      category,
      product,
      startDate,
      endDate
    })}`
  )
}
export function getSalesReturn({ category, product, startDate, endDate } = {}) {
  return this.$axios.$get(
    `/analytics/sales-returns${serializeQueryParams({
      category,
      product,
      start_date: startDate,
      end_date: endDate
    })}`
  )
}
export async function getSalesByDates({ category, product, startDate, endDate } = {}) {
  const result = await this.$axios.$get(
    `/analytics/sales-by-dates${serializeQueryParams({
      category,
      product,
      start_date: startDate,
      end_date: endDate
    })}`
  )
  return DashboardTransaction(DashboardTransactionSerializer(result || {}))
}
