import { MoveLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function RegisterPage() {
  return (
    <main className="flex h-[100dvh] flex-col p-8">
      <div className="mb-8 flex w-full items-center justify-between">
        <MoveLeft />
        <span className="text-sm font-semibold text-muted-foreground">
          TiresQ
        </span>
      </div>

      <div className="space-y-8">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold">Yuk daftar sekarang!</h1>
          <p className="text-sm font-light text-muted-foreground">
            Masukkan email dan kata sandi kamu untuk dapetin akun baru kamu
          </p>
        </div>

        <form className="space-y-6">
          <div className="input-wrapper">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" />
          </div>

          <div className="input-wrapper">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" />
          </div>

          <div className="input-wrapper">
            <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="confirmPassword"
            />
          </div>
        </form>
      </div>

      <div className="mt-auto flex flex-col items-center gap-4">
        <Button className="w-full">Daftar</Button>
        <span className="text-xs font-medium text-muted-foreground">
          Sudah punya akun?{' '}
          <Link
            className="text-primary underline underline-offset-2"
            href="/login"
          >
            Masuk
          </Link>
        </span>
      </div>
    </main>
  )
}
