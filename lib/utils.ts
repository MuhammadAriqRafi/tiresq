import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function mapHistoryStatusLabel(
  status: 'COMPLETED' | 'CANCELLED' | 'ONPROGRESS'
) {
  const mappedHistoryStatusLabel = {
    COMPLETED: 'Selesai',
    CANCELLED: 'Batal',
    ONPROGRESS: 'Berlangsung',
  }

  return mappedHistoryStatusLabel[status]
}

export function formatInputParseErrorOutput(fieldErrors: {
  [key: string]: string[]
}) {
  let formattedFieldErrors: { [key: string]: string } = {}

  Object.keys(fieldErrors).map((key) => {
    const errorMessage = fieldErrors[key][0]
    formattedFieldErrors = { ...formattedFieldErrors, [key]: errorMessage }
  })

  return formattedFieldErrors
}