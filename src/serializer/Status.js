export default function (el = {}) {
  return {
    id: +el.id || 1,
    title: el.title || 'не указано',
    name: el.name || 'empty',
    comment: el.comment || null
  }
}
