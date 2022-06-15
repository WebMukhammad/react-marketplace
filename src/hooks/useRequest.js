import { useEffect, useState } from 'react'

export default function useRequest(request, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    request()
      .then((response) => setData(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false))
  }, deps)

  return [data, loading, error]
}
