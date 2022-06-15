import CategoryBase from './CategoryBase'

export default function Category(el = {}) {
  return {
    ...CategoryBase(el),
    parentID: +el.parent_id || null,
    property: el.properties === false,
    children: el.children?.length ? el.children.map((item) => Category(item)) : []
  }
}
