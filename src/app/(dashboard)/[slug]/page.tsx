import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import React from 'react'

import { client } from '@/lib/client'

import FeedbackBoard from '@/components/feedback-board'

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      const response = await client.product.getProduct.$get({
        slug: slug,
      })
      return await response.json()
    },
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FeedbackBoard slug={slug} />
    </HydrationBoundary>
  )
}
