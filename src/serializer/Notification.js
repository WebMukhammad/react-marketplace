import { format } from 'date-fns'

export default function (el = {}) {
  return {
    id: el.id,
    date: el.created_at ? format(new Date(el.created_at), 'dd.MM.yyyy') : null,
    title: el.title,
    message: el.message,
    isReaded: !!el.read_at
  }
}
