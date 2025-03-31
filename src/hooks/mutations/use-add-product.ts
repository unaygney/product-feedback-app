// hooks/useCreateComment.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { client } from '@/lib/client'

export const useAddProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      name,
      slug,
      description,
      logo,
      websiteUrl,
    }: {
      name: string
      slug: string
      description?: string
      logo?: string
      websiteUrl?: string
    }) => {
      await client.product.createProduct.$post({
        name,
        slug,
        description: description ?? undefined,
        logo: logo ?? undefined,
        websiteUrl: websiteUrl ?? undefined,
      })
    },
    onSuccess: async (_, variables) => {
      toast.success('Comment created successfully!')
      await queryClient.invalidateQueries({
        queryKey: ['products'],
      })
    },
    onError: (err: unknown) => {
      if (err instanceof Error) {
        toast.error(err.message)
      } else {
        toast.error('An error occurred while creating the comment.')
      }
      console.error('Error creating comment:', err)
    },
  })
}
