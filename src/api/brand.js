import Brand from '~/model/Brand'
import BrandSerializer from 'src/serializer/Brand'
import api from '.'

export async function get() {
  const result = await api.get('/brands')
  return result?.map((el) => Brand(BrandSerializer(el))) || []
}
