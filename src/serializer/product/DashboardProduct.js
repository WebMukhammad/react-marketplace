import Image from '../Image'
import ProductBase from './ProductBase'

export default function (el = {}) {
  return {
    ...ProductBase(el),
    id: el.product_id,
    image: Image({ url: el.image_url }),
    refundQuantity: el.refund_quantity || null,
    saleQuantity: el.sale_quantity || null
  }
}
