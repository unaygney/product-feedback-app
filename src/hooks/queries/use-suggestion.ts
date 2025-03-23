import { useQuery } from '@tanstack/react-query'

import { client } from '@/lib/client'

/**
 *
 * @param id
 * @description Fetches a suggestion by id
 * @returns product, isLoading, isError
 */

export const useSuggestion = (id: string) => {
  const {
    data: suggestion,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['suggestion', id],
    queryFn: async () => {
      try {
        const response = await client.suggestion.get.$get({ id: id })
        return await response.json()
      } catch (error) {
        console.error('Error fetching product:', error)
        throw error
      }
    },
  })

  return { suggestion, isLoading, isError }
}
