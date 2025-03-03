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
  return <Button onClick={handleClick}>Logout</Button>
}
