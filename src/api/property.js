import Property from '~/model/Property'
import PropertySerializer from 'src/serializer/Property'
import { getByID as categoryGetByID } from './category'

export async function getByID({ id, include = 'children' } = {}) {
  const result = (await categoryGetByID({ id, include }))?.properties
  return result?.map((el) => Property(PropertySerializer(el))) || []
}
