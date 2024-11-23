'use client'

import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { FormEvent } from 'react'
import { useServerAction } from 'zsa-react'
import { formatInputParseErrorOutput } from '@/lib/utils'
import register from '@/app/(auth)/_actions/register.action'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import InputParseError from '@/components/ui/input-parse-error'
import InputPassword from '@/components/ui/input-password'
import { Label } from '@/components/ui/label'

export default function RegisterFormDev() {
  const { toast } = useToast()
  const { isPending, execute } = useServerAction(register, {
    onError({ err }) {
      toast({
        title: 'Gagal',
        variant: 'destructive',
        description: (
          <>
            {err.code !== 'INPUT_PARSE_ERROR' && err.message}
            {err.code === 'INPUT_PARSE_ERROR' && (
              <InputParseError
                formattedFieldErrors={formatInputParseErrorOutput(
                  err.fieldErrors
                )}
              />
            )}
          </>
        ),
      })
    },
  })

  async function handleOnSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    formData.append('captchaToken', 'dummyCaptchaToken')
    await execute(formData)
  }

  return (
    <form className="flex h-full flex-col gap-3" onSubmit={handleOnSubmit}>
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
