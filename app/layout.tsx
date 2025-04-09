import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import getUserAction from '@/app/(routes)/account/_actions/get-user.action'
import Navigation from '@/app/_components/navigation'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'
import { isAnonymousUser, isUser } from '@/utils/utils/auth.util'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = { title: 'TiresQ' }
export const viewport: Viewport = {
  width: 'device-width',
  maximumScale: 1,
  initialScale: 1,
}

export default async function RootLayout({ children }: LayoutProps) {
  const [user] = await getUserAction()

  return (
    <html lang="en">
      <body
        className={`${inter.className} mx-auto max-w-md overflow-hidden antialiased`}
      >
        <NextTopLoader showSpinner={false} />
        <Toaster
          position="top-center"
          richColors
          closeButton
          toastOptions={{ className: inter.className }}
        />

        {children}
        {(isUser(user) || isAnonymousUser(user)) && <Navigation />}
      </body>
    </html>
  )
}
