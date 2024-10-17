'use client'

import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { FormEvent } from 'react'
import { useServerAction } from 'zsa-react'
import { register } from '@/routes/(auth)/_actions/register'
import InputParseError from '@/app/_components/ui/input-parse-error'
import InputPassword from '@/app/_components/ui/input-password'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { formatInputParseErrorOutput } from '@/lib/utils'

export default function RegisterForm() {
  const { toast } = useToast()
  const { isPending, execute } = useServerAction(register, {
    onError({ err }) {
      toast({
        title: 'Gagal',
        variant: 'destructive',
        description:
          err.code === 'INPUT_PARSE_ERROR' ? (
            <InputParseError
              formattedFieldErrors={formatInputParseErrorOutput(
                err.fieldErrors
              )}
            />
          ) : (
            err.message
          ),
      })
    },
  })

  async function handleOnSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    await execute(formData)
  }

  return (
    <form className="flex h-full flex-col gap-5" onSubmit={handleOnSubmit}>
      <div className="input-wrapper">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="text" />
      </div>

      <div className="input-wrapper">
        <Label htmlFor="password">Password</Label>
        <InputPassword id="password" name="password" />
      </div>

      <div className="input-wrapper">
        <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
        <InputPassword id="confirmPassword" name="confirmPassword" />
      </div>

      <div className="mt-auto flex flex-col items-center gap-4">
        <Button className="w-full">
          {isPending ? <Loader2 className="animate-spin" /> : 'Daftar'}
        </Button>

        <span className="text-xs font-medium text-muted-foreground">
          Sudah punya akun?{' '}
          <Link
            href="/login"
            className="text-primary underline underline-offset-2"
          >
            Masuk
          </Link>
        </span>
      </div>
    </form>
  )
}
