import { format } from 'date-fns'
import ProductBase from './product/ProductBase'

export default function Order(el = {}) {
  return {
    id: +el.id,
    number: el.number,
    amount: Math.abs(el.amount) || null,
    date: el.date ? format(new Date(el.date), 'dd.MM.yyyy') : null,
    productCount: el.product_count,
    product: el.products?.map((el) => ProductBase({ ...el, image: { url: el.photo } })) || [],
    status: {
      id: +el.status?.id || 1,
      title: el.status?.title,
      name: el.status?.name
    }
  }
}
