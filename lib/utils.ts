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
