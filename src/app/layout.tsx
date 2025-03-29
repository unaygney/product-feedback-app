import type { Metadata } from 'next'
import { Jost } from 'next/font/google'

import { Providers } from '@/components/providers'

import './globals.css'

const jost = Jost({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Product Feedback App',
  description: 'Product feedback app built with Next.js ',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={jost.className}>
      <body className="scroll-smooth antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
