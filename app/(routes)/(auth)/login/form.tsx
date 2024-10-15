'use client'

import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { FormEvent } from 'react'
import { useServerAction } from 'zsa-react'
import { login } from '@/routes/(auth)/_actions/login'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'

export default function LoginForm() {
  const { toast } = useToast()
  const { isPending, execute } = useServerAction(login, {
    onSuccess({ data }) {
      toast({
        title: 'Berhasil',
        description: data.message,
      })
    },
    onError({ err }) {
      toast({
        title: 'Gagal',
        variant: 'destructive',
        description: err.message,
      })
    },
  })

  async function handleOnSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    await execute(formData)

    form.reset()
  }

  return (
    <form className="flex h-full flex-col gap-5" onSubmit={handleOnSubmit}>
      <div className="input-wrapper">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="text" />
      </div>

      <div className="input-wrapper">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" />
      </div>

      <div className="mt-auto flex flex-col items-center gap-4">
        <Button className="w-full">{isPending ? <Loader2 /> : 'Masuk'}</Button>
        <span className="text-xs font-medium text-muted-foreground">
          Belum punya akun?{' '}
          <Link
            href="/register"
            className="text-primary underline underline-offset-2"
          >
            Daftar
          </Link>
        </span>
      </div>
    </form>
  )
}
