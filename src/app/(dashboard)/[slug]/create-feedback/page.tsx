import React from 'react'

import CreateFeedback from '@/components/create-feedback'

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <CreateFeedback slug={slug} />
}
