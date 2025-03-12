'use client'

import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import React from 'react'

import { client } from '@/lib/client'

export default function SecretPage() {
  const { data: userData, isPending: loading } = useQuery({
    queryKey: ['get-recent-user'],
    queryFn: async () => {
      const res = await client.user.get.$get()
      return await res.json()
    },
  })

  if (loading)
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    )

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-2xl">This page secret</h3>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
    </div>
  )
}
