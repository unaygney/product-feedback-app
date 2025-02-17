'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

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

export default function AuthPage() {
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  const {
    register: registerFormRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  })

  const onLogin = (data: LoginInput) => {
    console.log('Login attempt:', data)
  }

  const onRegister = async (formData: RegisterInput) => {
    const { data, error } = await authClient.signUp.email(
      {
        email: formData.email,
        password: formData.password,
        name: 'User',
        callbackURL: '/',
      },
      {
        onRequest: (ctx) => {
          console.log(ctx)
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard or sign in page
          console.log(ctx)
        },
        onError: (ctx) => {
          console.log(ctx.error)
          alert(ctx.error.message)
        },
      }
    )
    console.log(data, error)
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
            <Tabs defaultValue="login" className="space-y-4">
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
                    />
                    {loginErrors.password && (
                      <p className="text-sm text-red-500">
                        {loginErrors.password.message}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700"
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
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      {...registerFormRegister('email')}
                      id="register-email"
                      type="email"
                      placeholder="m@example.com"
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
                    />
                    {registerErrors.confirmPassword && (
                      <p className="text-sm text-red-500">
                        {registerErrors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700"
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
