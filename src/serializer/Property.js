export default function (el = {}) {
  return {
    title: el.group,
    list:
      el.list?.map((el) => {
        let value = el.value || el.values
        value =
          Array.isArray(value) && isObject(value?.[0])
            ? value.map((el) => ({
                code: el.code_1c,
                id: el.id,
                value: el.value
              }))
            : value
        return {
          id: el.id,
          name: el.name,
          type: el.type,
          value
        }
      }) || []
  }

  function isObject(data) {
    return typeof data === 'object' && data !== null
  }
}
