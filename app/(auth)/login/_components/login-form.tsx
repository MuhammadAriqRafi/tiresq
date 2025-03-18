'use client'

import HCaptcha from '@hcaptcha/react-hcaptcha'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { FormEvent, useRef, useState } from 'react'
import { useServerAction } from 'zsa-react'
import { formatInputParseErrorOutput } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import InputParseError from '@/components/ui/input-parse-error'
import InputPassword from '@/components/ui/input-password'
import { Label } from '@/components/ui/label'
import anonymousLoginAction from '@/utils/actions/auth/login-anonymous.action'
import loginAction from '@/utils/actions/auth/login.action'
import { useToast } from '@/utils/hooks/use-toast'

export default function LoginForm() {
  const { toast } = useToast()
  const captchaRef = useRef<HCaptcha | null>(null)
  const [captchaToken, setCaptchaToken] = useState('')
  const { isPending: isLoginPending, execute: executeLogin } = useServerAction(
    loginAction,
    {
      onError({ err }) {
        if (err.code !== 'INPUT_PARSE_ERROR') {
          captchaRef.current?.resetCaptcha()
          setCaptchaToken('')
        }

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
    }
  )

  const { isPending: isAnonymousLoginPending, execute: executeAnonymousLogin } =
    useServerAction(anonymousLoginAction, {
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
    formData.append('captchaToken', captchaToken)
    await executeLogin(formData)
  }

  async function handleAnonymousLogin() {
    if (!captchaToken)
      return toast({
        title: 'Warning',
        variant: 'destructive',
        description: 'Captcha harus diisi',
      })
    await executeAnonymousLogin({ captchaToken })
  }

  return (
    <form
      method="POST"
      onSubmit={handleOnSubmit}
      className="flex h-full flex-col gap-5"
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
          ref={captchaRef}
          sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY}
          onVerify={setCaptchaToken}
          onExpire={() => setCaptchaToken('')}
          onError={() => setCaptchaToken('')}
        />

        <Button className="w-full">
          {!isLoginPending && !isAnonymousLoginPending && 'Masuk'}
          {(isLoginPending || isAnonymousLoginPending) && (
            <Loader2 className="animate-spin" />
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
