import type { Metadata } from 'next'

import { Providers } from '@/components/providers'

import './globals.css'

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
    <html lang="en">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
