'use client'

import { zodResolver } from '@hookform/resolvers/zod'
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
import SubmitButton from '@/components/submit-button'
import forgotPasswordAction from '@/utils/actions/auth/forgot-password.action'
import {
  ForgotPasswordRequestDto,
  ForgotPasswordRequestSchema,
  forgotPasswordRequestDefaultValue,
} from '@/utils/dtos/auth/forgot-password-request.dto'

export default function ForgotPasswordForm() {
  const form = useForm<ForgotPasswordRequestDto>({
    resolver: zodResolver(ForgotPasswordRequestSchema),
    defaultValues: forgotPasswordRequestDefaultValue,
  })

  async function onSubmit(input: ForgotPasswordRequestDto) {
    const [data, error] = await forgotPasswordAction(input)

    if (data) {
      toast.success('Email Berhasil Dikirim', { description: data.message })
      form.reset()
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

        <div className="mt-auto flex flex-col items-center gap-4">
          <SubmitButton
            disabled={form.formState.isSubmitting}
            className="w-full"
          >
            Reset Password
          </SubmitButton>
        </div>
      </form>
    </Form>
  )
}
