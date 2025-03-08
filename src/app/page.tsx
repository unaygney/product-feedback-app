import { headers } from 'next/headers'
import Link from 'next/link'

import { auth } from '@/lib/auth'
import { cn } from '@/lib/utils'

import LogoutButton from '@/components/logout-button'
import { Button } from '@/components/ui/button'

import { RecentPost } from './components/post'

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return (
    <main className="relative isolate flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      <div className="absolute inset-0 -z-10 bg-[url('/noise.svg')] opacity-50 mix-blend-soft-light [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
      <div className="container flex flex-col items-center justify-center gap-6 px-4 py-16">
        <p className="mb-8 text-center text-lg/7 text-pretty text-[#ececf399] sm:text-center sm:text-wrap md:text-xl/8">
          The stack for building seriously fast, lightweight and{' '}
          <span className="inline sm:block">
            end-to-end typesafe Next.js apps.
          </span>
        </p>

        {session ? (
          <LogoutButton />
        ) : (
          <Button asChild>
            <Link prefetch href={'/auth'}>
              Login
            </Link>
          </Button>
        )}

        <RecentPost />
      </div>
    </main>
  )
}
