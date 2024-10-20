'use client'

import { OctagonX } from 'lucide-react'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => console.error(error), [error])

  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-6 px-8">
      <OctagonX strokeWidth={1} className="size-16 stroke-muted-foreground" />
      <h2 className="text-center font-light">
        Maaf, sepertinya sedang terjadi kesalahan di server kami
      </h2>
      <Button onClick={() => reset()}>Coba Lagi</Button>
    </div>
  )
}
