import { format } from 'date-fns'
import Status from './Status'

export default function (el = {}) {
  return {
    id: +el.id,
    date: el.created_at ? format(new Date(el.created_at), 'dd.MM.yyyy') : null,
    confirmedDate: el.confirmed_at ? format(new Date(el.confirmed_at), 'dd.MM.yyyy') : null, // в будущем можно добавить в отдельный объект
    productCount: el.total_products || null,
    amount: +el.sum || null,
    store: el.store || null,
    status: Status(el.status || {})
  }
}
