'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { blacklistedRoutes, routes } from '@/routes/routes'
import { cn } from '@/lib/utils'

export default function Navigation() {
  const currentPath = usePathname()

  for (const blacklistedRoute of blacklistedRoutes) { 
    if (currentPath.startsWith(blacklistedRoute)) return null
  }

  return (
    <nav className="fixed bottom-0 w-full max-w-md shadow-[0_-5px_30px_-20px_rgba(0,0,0,0.3)]">
      <ul className="flex">
        {routes.map(({ url, text, icon }) => {
          const isActive = currentPath === url

          return (
            <Link
              key={text}
              href={url}
              className={cn(
                'flex grow flex-col items-center justify-center gap-1 py-3 text-center text-xs text-muted-foreground',
                {
                  'rounded-t-sm border-t-2 border-t-primary font-semibold text-primary':
                    isActive,
                }
              )}
            >
              {icon}
              <li>{text}</li>
            </Link>
          )
        })}
      </ul>
    </nav>
  )
}
