// hooks/useCreateComment.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { client } from '@/lib/client'

export const useUpdateSuggestion = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      content,
      suggestionId,
    }: {
      content: { title: string; category: string; description: string }
      suggestionId: string
    }) => {
      await client.suggestion.update.$post({
        suggestionId,
        content: {
          title: content.title,
          category: content.category as
            | 'feature'
            | 'ui'
            | 'ux'
            | 'enhancement'
            | 'bug',
          description: content.description,
        },
      })
    },
    onSuccess: async (_, variables) => {
      toast.success('Suggestion updated successfully!')
      await queryClient.invalidateQueries({
        queryKey: ['suggestion', variables.suggestionId],
      })
    },
    onError: (err: unknown) => {
      toast.error(err as string)
    },
  })
}
