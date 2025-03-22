import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { client } from '@/lib/client'

export const useUpvoteMutation = (suggestionId: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      await client.upvote.upvote.$post({
        suggestionId: suggestionId,
      })
    },
    onSuccess: async () => {
      toast.success('Upvoted!')
      await queryClient.invalidateQueries({
        queryKey: ['isVoted', suggestionId],
      })
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })
}
