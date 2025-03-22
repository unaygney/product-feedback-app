import { useQuery } from '@tanstack/react-query'

import { client } from '@/lib/client'

export function useVoteStatus(suggestionId: string) {
  return useQuery({
    queryKey: ['isVoted', suggestionId],
    queryFn: async () => {
      const res = await client.upvote.check.$get({
        suggestionId,
      })
      const r = await res.json()
      return r.isVoted
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
  })
}
