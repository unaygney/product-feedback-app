// hooks/useCreateComment.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { client } from '@/lib/client'

export const useCreateComment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      content,
      suggestionId,
      parentCommentId,
    }: {
      content: string
      suggestionId: string
      parentCommentId?: string | null
    }) => {
      await client.comment.create.$post({
        content,
        suggestionId,
        parentCommentId: parentCommentId ?? undefined,
      })
    },
    onSuccess: async (_, variables) => {
      toast.success('Comment created successfully!')
      await queryClient.invalidateQueries({
        queryKey: ['suggestion', variables.suggestionId],
      })
    },
    onError: (err: unknown) => {
      toast.error(err as string)
    },
  })
}
