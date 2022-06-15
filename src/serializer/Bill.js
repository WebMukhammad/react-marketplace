import { format } from 'date-fns'

export default function (el = {}) {
  return {
    id: el.id,
    amount: Number.isInteger(+el.amount) ? +el.amount : null,
    number: el.number,
    date: el.created_at ? format(new Date(el.created_at), 'dd.MM.yyyy') : null
  }
}
