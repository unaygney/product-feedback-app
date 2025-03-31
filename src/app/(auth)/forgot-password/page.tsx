'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Turnstile from 'react-turnstile'
import { z } from 'zod'

import { authClient } from '@/lib/auth-client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
})
type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>

export default function ForgotPassword() {
  const [token, setToken] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordInput) => {
    if (!token) {
      toast.error('Captcha verification is required.')
      return
    }

    try {
      const res = await authClient.forgetPassword({
        email: data.email,
        redirectTo: '/reset-password',
        fetchOptions: {
          headers: {
            'x-captcha-response': token,
          },
        },
      })

      if (res.error) {
        toast.error(res.error.message ?? 'Encountered an error.')
        return
      }
      toast.success('Password reset email has been sent successfully.')
    } catch (error) {
      console.error('Error sending password reset email:', error)
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-purple-400 to-pink-500 p-4">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-6 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Forgot Password</h1>
          <p className="text-muted-foreground">
            Enter your email to receive password reset instructions.
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
          <Turnstile
            sitekey={
              process.env.NODE_ENV === 'development'
                ? '1x00000000000000000000AA'
                : process.env.NEXT_PUBLIC_SITE_KEY
            }
            onVerify={(t) => setToken(t)}
          />
          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700"
            disabled={!token || isSubmitting}
            isLoading={isSubmitting}
          >
            Reset Password
          </Button>
          <div className="text-center text-sm">
            <Link href="/auth" className="text-purple-600 hover:underline">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
