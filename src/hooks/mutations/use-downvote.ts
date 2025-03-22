import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { client } from '@/lib/client'

export const useDownvoteMutation = (suggestionId: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      await client.upvote.downvote.$post({
        suggestionId: suggestionId,
      })
    },
    onSuccess: async () => {
      toast.success('Downvoted!')
      await queryClient.invalidateQueries({
        queryKey: ['isVoted', suggestionId],
      })
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })
}
