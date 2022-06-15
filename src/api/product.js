import { serializeQueryParams, getFormData, getCancelToken } from './helper'
import ProductBaseSerializer from 'src/serializer/product/ProductBase'
import BaseStatusSerializer from 'src/serializer/BaseStatus'
import ProductExtendedSerializer from 'src/serializer/product/ProductExtended'
import api from '.'

export async function get({ page = 1, perPage = 50, sort, order } = {}) {
  const result = await api.get(
    `/products${serializeQueryParams({
      page,
      per_page: perPage,
      sort,
      order
    })}`
  )

  return result?.map((el) => ProductBaseSerializer(el)) || []
}

export async function productPage(data) {
  const type = data.state !== 'all' || data.query || data.categories ? search : get
  const params = {
    ...data,
    state: data.state === 'all' ? null : data.state
  }
  const list = await type(params)

  return {
    list
  }
}
export function getByID({ id } = {}) {
  return api.get(`/products/${id}`)
}
export function create(data) {
  return api.post('/products', data)
}

export function remove(data) {
  return api.post('/products/delete', data)
}
export function update({ id, data } = {}) {
  return api.put(`/products/${id}`, data)
}
export function getPropsByID({ id } = {}) {
  return api.get(`/products/${id}/group-properties`)
}
export async function search({ page = 1, perPage = 50, query, state, sort, order, categories, cancel }) {
  const cancelToken = cancel
    ? getCancelToken({
        name: 'searchProduct',
        cancelToken: api.CancelToken
      })
    : null

  const result = await api.get(
    `/products/search${serializeQueryParams({
      page,
      per_page: perPage,
      q: query,
      state,
      sort,
      order,
      categories
    })}`,
    {
      cancelToken
    }
  )

  return result?.map((el) => ProductBaseSerializer(el)) || []
}
export async function getStatusList() {
  const result = await api.get('/products/stats')
  return result?.map((el) => BaseStatusSerializer(el)) || []
}
export function getProductImages({ id } = {}) {
  return api.get(`/products/${id}/images`)
}
export function getProductProps({ id } = {}) {
  return api.get(`/products/${id}/properties`)
}
export function sendImage({ images } = {}) {
  return api.post(
    '/images',
    getFormData({
      images
    })
  )
}
export function deleteImage(id) {
  return api.delete(`/images/${id}`)
}
export async function patch({ id, data } = {}) {
  const result = await api.patch(`/products/${id}`, data)

  return result ? ProductBaseSerializer(result) : {}
}
export function getTemplateXLS({ categoriesIds } = {}) {
  return api.post('/products/get-xls-templates', { categoriesIds })
}
export function getProductsTemplateXLS() {
  return api.get('/products/get-products-in-xls')
}
export function sendTemplate({ file } = {}) {
  return api.post(
    '/products/import-xls',
    getFormData({
      file
    })
  )
}
export function changeTemplate({ file } = {}) {
  return api.post(
    '/products/change-prices-and-quantities-by-xls',
    getFormData({
      file
    })
  )
}
export function setStatus(data) {
  return api.post('/products/set-state', data)
}

export async function getDataProduct({ id } = {}) {
  /**
   * Получаем данные для товара вместе с характеристиками
   */
  const result = await getByID({ id })
  const property = await getPropsByID({ id })

  return ProductExtendedSerializer({ ...result, property })
}
