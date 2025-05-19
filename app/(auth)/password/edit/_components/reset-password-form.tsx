'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
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
import InputPassword from '@/components/ui/input-password'
import SubmitButton from '@/components/submit-button'
import resetPasswordAction from '@/utils/actions/auth/reset-password.action'
import {
  ResetPasswordRequestDto,
  ResetPasswordRequestSchema,
  resetPasswordRequestDefaultValue,
} from '@/utils/dtos/auth/reset-password-request.dto'

export default function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const form = useForm<ResetPasswordRequestDto>({
    resolver: zodResolver(ResetPasswordRequestSchema),
    defaultValues: {
      ...resetPasswordRequestDefaultValue,
      resetCode: searchParams.get('code')!,
    },
  })

  async function onSubmit(input: ResetPasswordRequestDto) {
    const [data, error] = await resetPasswordAction(input)

    if (data) {
      toast.success('Reset Password Berhasil', { description: data.message })
      form.reset()
      router.replace('/')
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
            disabled={form.formState.isSubmitting}
            className="w-full"
          >
            Ubah Password
          </SubmitButton>
        </div>
      </form>
    </Form>
  )
}
