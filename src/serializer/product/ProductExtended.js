import Image from '../Image'
import Property from '../Property'
import ProductBase from './ProductBase'

export default function (el = {}) {
  return {
    ...ProductBase(el),
    width: el.width,
    height: el.height,
    weight: el.weight,
    length: el.length,
    brand: {
      id: el.brand?.id,
      name: el.brand?.name
    },
    category: {
      id: el.category?.id,
      name: el.category?.name
    },
    image: el.images?.map(Image) || [],
    description: el.description,
    property: el.property?.map((el) => Property(el)) || []
  }
}
