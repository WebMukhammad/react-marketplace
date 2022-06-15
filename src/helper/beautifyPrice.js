/**
 * Преобразование в формат цены
 */
export default function beautifyPrice(val) {
  return Math.round(val)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
}
