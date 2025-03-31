import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { client } from '@/lib/client'

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ name, image }: { name: string; image: string }) => {
      await client.user.update.$post({
        name,
        image,
      })
    },
    onSuccess: async (_, variables) => {
      toast.success('User updated successfully!')
      await queryClient.invalidateQueries({
        queryKey: ['user', variables.name],
      })
    },
    onError: (err: unknown) => {
      if (err instanceof Error) {
        toast.error(err.message)
      } else {
        toast.error('An unknown error occurred')
      }
      console.error(err)
      toast.error('Error updating user')
    },
  })
}
