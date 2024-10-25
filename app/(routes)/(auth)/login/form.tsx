'use client'

import HCaptcha from '@hcaptcha/react-hcaptcha'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { useServerAction } from 'zsa-react'
import { anonymousLogin } from '@/routes/(auth)/_actions/anonymous-login'
import { login } from '@/routes/(auth)/_actions/login'
import InputParseError from '@/app/_components/ui/input-parse-error'
import InputPassword from '@/app/_components/ui/input-password'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { formatInputParseErrorOutput } from '@/lib/utils'

export default function LoginForm() {
  const { toast } = useToast()
  const [captchaToken, setCaptchaToken] = useState('')
  const { isPending: isLoginPending, execute: executeLogin } = useServerAction(
    login,
    {
      bind: { captchaToken },
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
    }
  )

  const { isPending: isAnonymousLoginPending, execute: executeAnonymousLogin } =
    useServerAction(anonymousLogin, {
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
    await executeLogin(formData)
  }

  async function handleAnonymousLogin() {
    if (!captchaToken)
      return toast({
        title: 'Warning',
        description: 'Captcha harus diisi',
        variant: 'destructive',
      })

    await executeAnonymousLogin({ captchaToken })
  }

  return (
    <form
      className="flex h-full flex-col gap-5"
      onSubmit={handleOnSubmit}
      method="POST"
    >
      <div className="input-wrapper">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="text" />
      </div>

      <div className="input-wrapper">
        <Label htmlFor="password">Password</Label>
        <InputPassword id="password" name="password" />
      </div>

      <div className="mt-auto flex flex-col items-center gap-4">
        <HCaptcha
          sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY}
          onVerify={setCaptchaToken}
        />

        <Button className="w-full">
          {isLoginPending || isAnonymousLoginPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            'Masuk'
          )}
        </Button>

        <p className="text-xs font-medium text-muted-foreground">
          Belum punya akun?{' '}
          <Link
            href="/register"
            className="text-primary underline underline-offset-2"
          >
            Daftar
          </Link>{' '}
          atau{' '}
          <Button
            type="button"
            variant="link"
            onClick={handleAnonymousLogin}
            className="m-0 h-fit p-0 text-xs text-primary underline underline-offset-2"
          >
            Masuk Sebagai Tamu
          </Button>
        </p>
      </div>
    </form>
  )
}
