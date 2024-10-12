import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import Navigation from '@/app/(routes)/navigation'
import { Toaster } from '@/components/ui/toaster'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = { title: 'TiresQ' }

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} mx-auto max-w-md overflow-hidden antialiased`}
      >
        <NextTopLoader showSpinner={false} />
        {children}
        <Navigation />
        <Toaster />
      </body>
    </html>
  )
}
