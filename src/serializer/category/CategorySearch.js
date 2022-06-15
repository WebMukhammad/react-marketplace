import CategoryBase from './CategoryBase'

export default function (el = {}) {
  return {
    ...CategoryBase(el),
    tree: el.tree?.map((el) => CategoryBase(el)) || []
  }
}
