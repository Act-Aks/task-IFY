import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { routes } from '@/constants'

import localFont from 'next/font/local'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const headingFont = localFont({
  src: '../public/fonts/font.woff2',
})

type Route = keyof typeof routes
type RouteParams = Record<string, any>

export const generateRoute = (route: Route, params?: RouteParams) => {
  let path = routes[route]

  if (!params) {
    return path
  }

  Object.keys(params).forEach(key => {
    path = path.replace(`:${key}`, params[key])
  })

  return path
}

generateRoute('organization', { id: '12345' })
