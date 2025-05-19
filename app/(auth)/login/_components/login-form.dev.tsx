'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'nextjs-toploader/app'
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

export default function LoginFormDev() {
  const router = useRouter()
  const form = useForm<LoginRequestDto>({
    resolver: zodResolver(LoginRequestSchema),
    defaultValues: loginRequestDefaultValue,
  })

  async function onSubmit(input: LoginRequestDto) {
    const [data, error] = await loginAction(input)

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

        <div className="flex flex-col gap-4">
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
          <Link
            href="/password/new"
            className="w-fit text-xs font-semibold text-muted-foreground transition-all hover:text-foreground hover:underline hover:underline-offset-4"
          >
            Lupa password?
          </Link>
        </div>

        <div className="mt-auto flex flex-col items-center gap-4">
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
            <LoginAnonymousButton />
          </div>
        </div>
      </form>
    </Form>
  )
}
