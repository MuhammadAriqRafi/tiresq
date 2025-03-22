'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { routePathsWithHiddenNav, routes } from '@/app/routes'

export default function Navigation() {
  const currentPath = usePathname()

  for (const routePathWithHiddenNav of routePathsWithHiddenNav) {
    if (currentPath.startsWith(routePathWithHiddenNav)) return null
  }

  return (
    <nav className="fixed bottom-0 w-full max-w-md bg-white shadow-[0_-5px_30px_-20px_rgba(0,0,0,0.3)]">
      <ul className="flex">
        {routes.map(({ href, label, icon: Icon }) => {
          const isActive = currentPath === href

          return (
            <Link
              key={label}
              href={href}
              className={cn(
                'flex grow flex-col items-center justify-center gap-1 bg-gray-50 py-3 text-center text-xs text-muted-foreground',
                {
                  'border-t-2 border-t-primary bg-background font-semibold text-primary':
                    isActive,
                }
              )}
            >
              <Icon />
              <li>{label}</li>
            </Link>
          )
        })}
      </ul>
    </nav>
  )
}
