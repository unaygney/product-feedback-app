'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

import { authClient } from '@/lib/auth-client'

import { Button } from './ui/button'

export default function LogoutButton() {
  const router = useRouter()
  const handleClick = async () => {
    await authClient.signOut()
    router.push('/')
  }
  return (
    <Button
      className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-8 py-6 text-lg hover:from-indigo-600 hover:to-purple-600"
      onClick={handleClick}
    >
      Logout
    </Button>
  )
}
