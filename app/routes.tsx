import { History, Home, UserRound } from 'lucide-react'

export const routes = [
  {
    href: '/histories',
    label: 'Riwayat',
    icon: History,
  },
  {
    href: '/',
    label: 'Beranda',
    icon: Home,
  },
  {
    href: '/account',
    label: 'Akun',
    icon: UserRound,
  },
]

export const routePathsWithHiddenNav = [
  '/login',
  '/register',
  '/experience',
  '/account',
]
