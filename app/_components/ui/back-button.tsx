'use client'

import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function BackButton() {
  const router = useRouter()
  return <X onClick={() => router.back()} />
}
