import RefundBase from './Refund'
import ProductBase from './product/ProductBase'

export default function (el = {}) {
  return {
    ...RefundBase(el),
    product:
      el.products?.map((el) => ({
        ...ProductBase(el),
        refund: {
          id: +el.pivot.refund_id,
          count: +el.pivot.count || null
        }
      })) || []
  }
}
