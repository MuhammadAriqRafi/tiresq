'use client'

import { ReactNode, createContext, useContext, useState } from 'react'
import { toast } from 'sonner'
import getOnProgressEscort from '@/utils/actions/escorts/get-on-progress-escort.action'

export const useOnProgressEscort = () => useContext(OnProgressEscortContext)
export const OnProgressEscortContext = createContext<{
  onProgressEscort: OnProgressEscort | null
  refreshOnProgressEscort: () => void
  resetOnProgressEscort: () => void
}>({
  onProgressEscort: null,
  refreshOnProgressEscort: () => {},
  resetOnProgressEscort: () => {},
})

export default function OnProgressEscortProvider({
  escort,
  children,
}: {
  escort: OnProgressEscort | null
  children: ReactNode
}) {
  const [onProgressEscort, setOnProgressEscort] =
    useState<OnProgressEscort | null>(escort)

  async function refreshOnProgressEscort() {
    const [refreshedOnProgressEscort, error] = await getOnProgressEscort()
    if (refreshedOnProgressEscort !== null)
      setOnProgressEscort(refreshedOnProgressEscort)

    if (error)
      toast.error('Oops...', {
        description:
          'Gagal memperbarui data perjalanan, silahkan coba refresh halaman',
      })
  }

  async function resetOnProgressEscort() {
    setOnProgressEscort(null)
  }

  return (
    <OnProgressEscortContext.Provider
      value={{
        onProgressEscort,
        refreshOnProgressEscort,
        resetOnProgressEscort,
      }}
    >
      {children}
    </OnProgressEscortContext.Provider>
  )
}
