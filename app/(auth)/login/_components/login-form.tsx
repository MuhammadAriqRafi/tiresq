'use client'

import HCaptcha from '@hcaptcha/react-hcaptcha'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'nextjs-toploader/app'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import LoginAnonymousButton from '@/app/(auth)/login/_components/login-anonymous-button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import InputPassword from '@/components/ui/input-password'
import SubmitButton from '@/components/submit-button'
import loginAction from '@/utils/actions/auth/login.action'
import {
  LoginRequestDto,
  LoginRequestSchema,
  loginRequestDefaultValue,
} from '@/utils/dtos/auth/login-request.dto'

export default function LoginForm() {
  const captchaRef = useRef<HCaptcha | null>(null)
  const [captchaToken, setCaptchaToken] = useState('')
  const router = useRouter()
  const form = useForm<LoginRequestDto>({
    resolver: zodResolver(LoginRequestSchema),
    defaultValues: loginRequestDefaultValue,
  })

  async function onSubmit(input: LoginRequestDto) {
    const [data, error] = await loginAction({ ...input, captchaToken })

    if (data) {
      toast.success('Login Berhasil', { description: data.message })
      form.reset()
      setTimeout(() => router.replace('/'), 250)
    }

    if (error) toast.error('Gagal', { description: error.message })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full flex-col gap-5"
      >
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <InputPassword {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-auto flex flex-col items-center gap-4">
          <HCaptcha
            ref={captchaRef}
            sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY}
            onVerify={setCaptchaToken}
            onExpire={() => setCaptchaToken('')}
            onError={() => setCaptchaToken('')}
          />

          <SubmitButton
            disabled={form.formState.isSubmitting}
            className="w-full"
          >
            Masuk
          </SubmitButton>

          <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
            <span>Belum punya akun?</span>
            <Link
              href="/register"
              className="text-primary underline underline-offset-2"
            >
              Daftar
            </Link>
            <span>atau</span>
            <LoginAnonymousButton captchaToken={captchaToken} />
          </div>
        </div>
      </form>
    </Form>
  )
}
