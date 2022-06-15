export default function (el = {}) {
  return {
    name: `${el.name} ${el.productCount}`,
    value: el.value
  }
}
