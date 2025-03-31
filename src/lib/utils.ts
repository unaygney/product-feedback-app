import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const getStatusColor = (columnType: string) => {
  switch (columnType) {
    case 'Planned':
      return 'text-orange-500'
    case 'In-Progress':
      return 'text-purple-500'
    case 'Live':
      return 'text-blue-500'
    default:
      return 'text-gray-500'
  }
}

export const getTypeBg = (type: string) => {
  switch (type) {
    case 'Feature':
      return 'bg-blue-100 text-blue-700'
    case 'Enhancement':
      return 'bg-purple-100 text-purple-700'
    case 'Bug':
      return 'bg-red-100 text-red-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}
