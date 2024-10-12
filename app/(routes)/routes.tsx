import { History, Home, UserRound } from 'lucide-react'

export const routes = [
  {
    url: '/histories',
    text: 'Riwayat',
    icon: <History />,
  },
  {
    url: '/',
    text: 'Beranda',
    icon: <Home />,
  },
  {
    url: '/account',
    text: 'Akun',
    icon: <UserRound />,
  },
]

export const blacklistedRoutes = ['/login', '/register', '/histories']
