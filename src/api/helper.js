export function serializeQueryParams(obj = {}, { delimiter = '&' } = {}) {
  if (Object.keys(obj).length === 0) {
    return ''
  }
  let query = '?'
  for (const prop in obj) {
    if (Array.isArray(obj[prop])) {
      const str = obj[prop].reduce((reducer, value, index, arr) => {
        return (reducer += index === arr.length - 1 ? value : `${value},`)
      }, '')
      query += `${prop}=${str}${delimiter}`
    } else if (typeof obj[prop] === 'boolean' || (obj[prop] !== undefined && obj[prop] !== null)) {
      query += `${prop}=${encodeURIComponent(obj[prop]).toString()}${delimiter}`
    }
  }
  return query.slice(0, -1) // crop the last char, it's a unnecessary delimiter
}

export function getFormData(obj) {
  const data = new FormData()

  for (const prop in obj) {
    if (obj[prop] instanceof FileList) {
      Array.from(obj[prop]).forEach((el) => {
        data.append(prop + '[]', el)
      })
    } else {
      data.append(prop, obj[prop])
    }
  }

  return data
}

const requestSources = {}

export function getCancelToken({ name, cancelToken }) {
  requestSources[name]?.cancel?.('was-canceled')
  requestSources[name] = cancelToken.source()
  return requestSources[name].token
}
