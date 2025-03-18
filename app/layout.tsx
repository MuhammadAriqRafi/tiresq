import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import Navigation from '@/app/_components/navigation'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = { title: 'TiresQ' }
export const viewport: Viewport = {
  width: 'device-width',
  maximumScale: 1,
  initialScale: 1,
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} mx-auto max-w-md overflow-hidden antialiased`}
      >
        <NextTopLoader showSpinner={false} />
        {children}
        <Navigation />
        <Toaster
          richColors
          closeButton
          toastOptions={{ className: inter.className }}
        />
      </body>
    </html>
  )
}
