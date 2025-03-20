import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { notFound, unauthorized } from 'next/navigation'
import React from 'react'

import { auth } from '@/lib/auth'

import FeedbackBoard from '@/components/feedback-board'

import { db } from '@/server/db'

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ productName: string }>
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const { productName } = await params

  if (!session) {
    unauthorized()
  }

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
