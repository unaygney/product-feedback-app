import { headers } from 'next/headers'
import { unauthorized } from 'next/navigation'
import React from 'react'

import { auth } from '@/lib/auth'

import FeedbackBoard from '@/components/feedback-board'

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    unauthorized()
  }

  return <FeedbackBoard />
}
