import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import React from 'react'

import FeedbackBoard from '@/components/feedback-board'

import { db } from '@/server/db'

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ productName: string }>
}) {
  const { productName } = await params

  const product = await db.query.product.findFirst({
    where: (p) => eq(p.name, productName),
    with: {
      suggestions: {
        with: {
          comments: true,
          votes: true,
        },
      },
    },
  })

  if (!product) {
    notFound()
  }

  return <FeedbackBoard product={product} />
}
