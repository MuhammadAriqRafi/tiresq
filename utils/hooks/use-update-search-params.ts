import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function useUpdateSearchParams() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function update({ key, value }: { key: string; value: string }) {
    const params = new URLSearchParams(searchParams)
    if (value) params.set(key, value)
    else params.delete(key)

    const newUrl = `${pathname}?${params.toString()}`
    router.replace(newUrl)
  }

  return { update }
}
