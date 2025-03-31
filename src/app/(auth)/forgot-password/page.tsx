'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

import { authClient } from '@/lib/auth-client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const forgotPasswordSchema = z.object({
  email: z.string().email('Geçerli bir e-posta adresi girin.'),
})
type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>

export default function ForgotPassword() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordInput) => {
    try {
      //TODO: add API call to send reset link
      await new Promise((resolve) => setTimeout(resolve, 1000))
      authClient.forgetPassword({
        email: data.email,
        redirectTo: '/auth',
      })
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-purple-400 to-pink-500 p-4">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-6 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Şifre Sıfırlama</h1>
          <p className="text-muted-foreground">
            E-posta adresinizi girin, size reset linki gönderelim.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register('email')}
              id="email"
              type="email"
              placeholder="m@example.com"
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700"
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            Reset Password
          </Button>
          <div className="text-center text-sm">
            <Link href="/login" className="text-purple-600 hover:underline">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
