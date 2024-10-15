'use client'

import { MoveLeft, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NavigationButton({
  url,
  type,
}: {
  url?: string
  type: 'BACK' | 'CLOSE'
}) {
  const router = useRouter()

  if (url)
    return (
      <Link href={url}>
        {type === 'BACK' && <MoveLeft />}
        {type === 'CLOSE' && <X />}
      </Link>
    )

  return (
    <>
      {type === 'BACK' && <MoveLeft onClick={() => router.back()} />}
      {type === 'CLOSE' && <X onClick={() => router.back()} />}
    </>
  )
}
