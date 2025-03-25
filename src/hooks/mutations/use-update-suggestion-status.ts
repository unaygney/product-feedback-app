import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { client } from '@/lib/client'

interface UpdateSuggestionStatusVariables {
  suggestionId: string
  newStatus: 'planned' | 'in-progress' | 'live'
}

export const useUpdateSuggestionStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      suggestionId,
      newStatus,
    }: UpdateSuggestionStatusVariables) => {
      await client.suggestion.updateStatus.$post({
        suggestionId,
        newStatus,
      })
    },
    onSuccess: async () => {
      toast.success('Suggestion status updated!')
      await queryClient.invalidateQueries({ queryKey: ['suggestions'] })
      await queryClient.invalidateQueries({ queryKey: ['product'] })
    },
    onError: (err: any) => {
      toast.error(err.message)
    },
  })
}
