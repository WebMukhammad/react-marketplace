import { format } from 'date-fns'
import Image from '../Image'
import Commission from '../Commission'
import Status from '../Status'

export default function ProductBase(el = {}) {
  return {
    id: el.id,
    name: el.name,
    slug: el.slug,
    barcode: el.barcode,
    active: el.isvisible,
    archived: el.archived,
    price: Number.isInteger(+el.price) ? +el.price : null,
    quantity: el.quantity,
    imported: el.imported,
    date: el.created_at ? format(new Date(el.created_at), 'dd.MM.yyyy') : null,
    commission: Commission(el.commission || {}),
    status: Status(el.status || {}),
    image: Image(el.images?.[0] || {})
  }
}
