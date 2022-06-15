import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

export default function (el = {}) {
  return {
    total: {
      refund: Math.abs(el.total_refund) || null,
      sale: Math.abs(el.total_sale) || null
    },
    list:
      el.graph?.map((el) => ({
        date: el.date ? format(new Date(el.date), 'd MMMM', { locale: ru }) : null,
        refund: Math.abs(el.refund) || 0,
        sale: Math.abs(el.sale) || 0
      })) || []
  }
}
