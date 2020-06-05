import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useApiService<T>(
  url: string
): { response: T | null; error: Error | null; isLoading: boolean; pages: number | null } {
  const baseUrl = 'http://localhost:8009'
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [pages, setPages] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true)
      try {
        const res = await axios(`${baseUrl}${url}`)
        setPages(res.headers['x-wp-totalpages'])
        setResponse(res.data)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        setError(error)
      }
    }
    fetchData()
  }, [url])
  return { response, error, isLoading, pages }
}
