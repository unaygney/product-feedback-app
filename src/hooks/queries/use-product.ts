import { useQuery } from '@tanstack/react-query'

import { client } from '@/lib/client'

export const useProduct = (slug: string) => {
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      try {
        const response = await client.product.getProduct.$get({
          slug: slug,
        })
        return await response.json()
      } catch (error) {
        console.error('Error fetching product:', error)
        throw error
      }
    },
  })

  return { product, isLoading, isError }
}
export const useProducts = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      try {
        const response = await client.product.getProducts.$get()
        return await response.json()
      } catch (error) {
        console.error('Error fetching products:', error)
        throw error
      }
    },
  })
  return { products, isLoading, isError }
}
