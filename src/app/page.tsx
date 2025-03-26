import {
  ArrowRight,
  CheckCircle,
  MessageSquare,
  Star,
  Users,
} from 'lucide-react'
import { headers } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

import { auth } from '@/lib/auth'

import LogoutButton from '@/components/logout-button'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navigation */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            <span className="text-xl font-bold">Frontend Mentor</span>
          </div>
          <nav className="hidden space-x-8 md:flex">
            <Link
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-purple-600"
            >
              Features
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-purple-600"
            >
              Pricing
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-purple-600"
            >
              Community
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-purple-600"
            >
              Support
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            {session ? (
              <LogoutButton />
            ) : (
              <Link prefetch href={'/auth'}>
                Login
              </Link>
            )}

            <Link className="text-lg text-white" href="/secret">
              Go to secret page
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-indigo-50"></div>
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                Build better products with customer feedback
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                Collect, organize and prioritize feedback from your users. Make
                data-driven decisions and build what matters.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
                <Button className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-8 py-6 text-lg hover:from-indigo-600 hover:to-purple-600">
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  className="rounded-lg border-gray-300 px-8 py-6 text-lg"
                >
                  See Demo
                </Button>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-md md:mx-0">
              <div className="aspect-[4/3] overflow-hidden rounded-xl bg-white p-2 shadow-xl">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Dashboard Preview"
                  width={800}
                  height={600}
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 shadow-lg"></div>
              <div className="absolute -top-6 -right-6 h-24 w-24 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">10k+</p>
              <p className="mt-2 text-sm text-gray-600">Active Users</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">50k+</p>
              <p className="mt-2 text-sm text-gray-600">Feedback Items</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">99%</p>
              <p className="mt-2 text-sm text-gray-600">
                Customer Satisfaction
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">24/7</p>
              <p className="mt-2 text-sm text-gray-600">Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Everything you need to collect and manage feedback
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Our platform provides all the tools you need to gather, organize,
              and act on user feedback.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <Card className="overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
              <div className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Collect Feedback
                </h3>
                <p className="mt-4 text-gray-600">
                  Easily collect feedback from your users with customizable
                  forms and widgets that integrate seamlessly with your product.
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Customizable feedback forms</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>In-app feedback widgets</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Email collection campaigns</span>
                  </li>
                </ul>
              </div>
            </Card>

            {/* Feature 2 */}
            <Card className="overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
              <div className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                  <Star className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Prioritize Ideas
                </h3>
                <p className="mt-4 text-gray-600">
                  Let your users vote on features and prioritize your roadmap
                  based on what your customers actually want.
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Voting and ranking system</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Customizable roadmap</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Priority scoring algorithms</span>
                  </li>
                </ul>
              </div>
            </Card>

            {/* Feature 3 */}
            <Card className="overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <div className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Engage Community
                </h3>
                <p className="mt-4 text-gray-600">
                  Build a thriving community around your product where users can
                  discuss ideas and help each other.
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Discussion forums</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>User profiles and reputation</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Notification system</span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Trusted by product teams worldwide
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              See what our customers have to say about how our platform has
              transformed their product development.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {/* Testimonial 1 */}
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <Image
                  src="/placeholder.svg?height=48&width=48"
                  alt="Avatar"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <h4 className="font-bold text-gray-900">Sarah Johnson</h4>
                  <p className="text-sm text-gray-600">
                    Product Manager at Acme Inc.
                  </p>
                </div>
              </div>
              <div className="mt-4 flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="mt-4 text-gray-600">
                "This platform has completely transformed how we collect and
                prioritize feedback. Our roadmap is now truly customer-driven."
              </p>
            </Card>

            {/* Testimonial 2 */}
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <Image
                  src="/placeholder.svg?height=48&width=48"
                  alt="Avatar"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <h4 className="font-bold text-gray-900">Michael Chen</h4>
                  <p className="text-sm text-gray-600">CTO at TechStart</p>
                </div>
              </div>
              <div className="mt-4 flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="mt-4 text-gray-600">
                "The voting system has been a game-changer. We now have clear
                data on what features our users actually want, not just what
                they say they want."
              </p>
            </Card>

            {/* Testimonial 3 */}
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <Image
                  src="/placeholder.svg?height=48&width=48"
                  alt="Avatar"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <h4 className="font-bold text-gray-900">Emily Rodriguez</h4>
                  <p className="text-sm text-gray-600">
                    UX Designer at DesignCo
                  </p>
                </div>
              </div>
              <div className="mt-4 flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="mt-4 text-gray-600">
                "The community aspect has been invaluable. Our users help each
                other and provide insights we would never have thought of
                internally."
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-20 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Ready to transform your product feedback process?
              </h2>
              <p className="mt-4 text-lg text-indigo-100">
                Join thousands of product teams who use our platform to build
                better products.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
              <Button className="rounded-lg bg-white px-8 py-6 text-lg text-purple-600 hover:bg-indigo-100">
                Sign Up Free <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-gray-400">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-md bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                <span className="text-xl font-bold text-white">
                  Frontend Mentor
                </span>
              </div>
              <p className="mt-4 text-sm">
                Helping product teams collect and prioritize feedback to build
                better products.
              </p>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8 text-center">
            <p className="text-sm">
              © {new Date().getFullYear()} Frontend Mentor. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
