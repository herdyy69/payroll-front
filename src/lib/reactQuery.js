import { useQuery } from 'react-query'

export const useQueryBase = (url, options) => {
  const { data, isLoading, error } = useQuery(
    url,
    () =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`).then(res =>
        res.json(),
      ),
    options,
  )
  return { data, isLoading, error }
}
