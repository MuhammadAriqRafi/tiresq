import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { ReactNode } from 'react'

export default function MenuItem({
  name,
  description,
  icon,
  url,
}: {
  name: string
  description: string
  icon: ReactNode
  url?: string
}) {
  const menuItem = (
    <div className="flex space-x-3 border-b py-2 text-muted-foreground">
      {icon}
      <div className="flex flex-col gap-0.5 text-black">
        <p className="text-sm font-semibold">{name}</p>
        <span className="text-xs font-light">{description}</span>
      </div>
      <ChevronRight className="ml-auto min-w-5 max-w-5" />
    </div>
  )

  if (!url) return menuItem
  return <Link href={url}>{menuItem}</Link>
}
