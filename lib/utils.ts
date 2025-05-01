import { type ClassValue, clsx } from 'clsx'
import { customAlphabet } from 'nanoid'
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

  Object.keys(fieldErrors).forEach((key) => {
    const errorMessage = fieldErrors[key][0]
    formattedFieldErrors = { ...formattedFieldErrors, [key]: errorMessage }
  })

  return formattedFieldErrors
}

export function tryCatchWrapper<T>(
  promise: Promise<T>
): Promise<[T, undefined] | [undefined, Error]> {
  return promise
    .then((data) => [data, undefined] as [T, undefined])
    .catch((error) => {
      console.error(error)
      return [undefined, error]
    })
}

export function parseDateToHumanreadableFormat(milliseconds: bigint): string {
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).format(new Date(Number(milliseconds)))
}

export function customAlphabetNanoid(maxLength: number = 8) {
  return customAlphabet(
    '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    maxLength
  )()
}

export function generateId(
  prefix: string,
  maxLength: number = 8,
  delimiter: string = '-'
) {
  return `${prefix}${delimiter}${customAlphabetNanoid(maxLength)}`
}

export function capitalize(str: string) {
  const lowerCasedString = str.toLocaleLowerCase()
  return lowerCasedString.charAt(0).toUpperCase() + lowerCasedString.slice(1)
}

export function formatDateTimeToTime(datetime: Date) {
  const date = new Date(datetime)
  return `${date.getUTCHours().toString().padStart(2, '0')}:${date.getUTCMinutes().toString().padStart(2, '0')}`
}
