'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Turnstile from 'react-turnstile'

import { authClient } from '@/lib/auth-client'
import {
  type LoginInput,
  type RegisterInput,
  loginSchema,
  registerSchema,
} from '@/lib/form-schemas'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function AuthPageContent() {
  const [token, setToken] = useState<string>('')
  const router = useRouter()

  // Login Form
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  // Register Form
  const {
    register: registerFormRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  })

  const onLogin = async (formData: LoginInput) => {
    const loadingToastId = toast.loading('Signing in...')
    await authClient.signIn.email(
      {
        email: formData.email,
        password: formData.password,
        fetchOptions: {
          headers: {
            'x-captcha-response': token,
          },
        },
      },
      {
        onSuccess: (ctx) => {
          toast.dismiss(loadingToastId)
          toast.success(`Welcome back, ${ctx.data.user.name}. Redirecting...`)
          router.push('/')
        },
        onError: (ctx) => {
          toast.remove(loadingToastId)
          toast.error(ctx.error.message)
        },
      }
    )
  }

  const onRegister = async (formData: RegisterInput) => {
    const loadingToastId = toast.loading('Creating account...')

    try {
      const { data, error } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        callbackURL: '/',
        fetchOptions: {
          headers: {
            'x-captcha-response': token,
          },
        },
      })
      if (!error) {
        toast.dismiss(loadingToastId)
        toast.success(`Account created for ${data.user.name}. Redirecting...`)
        router.push('/')
      }
    } catch (error: unknown) {
      toast.remove(loadingToastId)
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('An unknown error occurred')
      }
    }
  }

  return (
    <div className="min-h-screen w-full">
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-purple-400 to-pink-500 p-4">
        <div className="container mx-auto flex flex-1 items-center justify-center">
          <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-6 shadow-lg">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight">
                Frontend Mentor
              </h1>
              <p className="text-muted-foreground">
                Sign in to your account or create a new one
              </p>
            </div>
            <Tabs defaultValue={'login'} className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <form
                  onSubmit={handleLoginSubmit(onLogin)}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      {...loginRegister('email')}
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      autoComplete="email"
                    />
                    {loginErrors.email && (
                      <p className="text-sm text-red-500">
                        {loginErrors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      {...loginRegister('password')}
                      id="password"
                      type="password"
                      placeholder="******"
                      autoComplete="current-password"
                    />
                    {loginErrors.password && (
                      <p className="text-sm text-red-500">
                        {loginErrors.password.message}
                      </p>
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
                    Sign in
                  </Button>
                  <div className="text-center text-sm">
                    <Link
                      href="/forgot-password"
                      className="text-purple-600 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="register">
                <form
                  onSubmit={handleRegisterSubmit(onRegister)}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Full Name</Label>
                    <Input
                      {...registerFormRegister('name')}
                      id="register-name"
                      type="text"
                      placeholder="John Doe"
                    />
                    {registerErrors.name && (
                      <p className="text-sm text-red-500">
                        {registerErrors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      {...registerFormRegister('email')}
                      id="register-email"
                      type="email"
                      placeholder="m@example.com"
                      autoComplete="email"
                    />
                    {registerErrors.email && (
                      <p className="text-sm text-red-500">
                        {registerErrors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      {...registerFormRegister('password')}
                      id="register-password"
                      type="password"
                      placeholder="******"
                      autoComplete="new-password"
                    />
                    {registerErrors.password && (
                      <p className="text-sm text-red-500">
                        {registerErrors.password.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      {...registerFormRegister('confirmPassword')}
                      id="confirm-password"
                      type="password"
                      placeholder="******"
                      autoComplete="new-password"
                    />
                    {registerErrors.confirmPassword && (
                      <p className="text-sm text-red-500">
                        {registerErrors.confirmPassword.message}
                      </p>
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
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
