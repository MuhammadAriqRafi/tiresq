'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'nextjs-toploader/app'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
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
import registerAction from '@/utils/actions/auth/register.action'
import {
  RegisterRequestDto,
  RegisterRequestSchema,
  registerRequestDefaultValue,
} from '@/utils/dtos/auth/register-request.dto'

export default function RegisterFormDev() {
  const router = useRouter()
  const form = useForm<RegisterRequestDto>({
    resolver: zodResolver(RegisterRequestSchema),
    defaultValues: registerRequestDefaultValue,
  })

  async function onSubmit(input: RegisterRequestDto) {
    const [data, error] = await registerAction(input)

    if (data) {
      toast.success('Berhasil', { description: data.message })
      form.reset()
      setTimeout(() => router.replace('/'), 250)
    }

    if (error) toast.error('Gagal', { description: error.message })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full flex-col gap-3"
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

        <FormField
          name="confirmPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Konfirmasi Password</FormLabel>
              <FormControl>
                <InputPassword {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-auto flex flex-col items-center gap-4">
          <SubmitButton
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            Daftar
          </SubmitButton>

          <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
            <span>Sudah punya akun?</span>
            <Link
              href="/login"
              className="text-primary underline underline-offset-2"
            >
              Masuk
            </Link>
          </div>
        </div>
      </form>
    </Form>
  )
}
