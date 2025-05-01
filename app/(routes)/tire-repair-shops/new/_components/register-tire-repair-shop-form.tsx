'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MoveLeft } from 'lucide-react'
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
import SubmitButton from '@/components/submit-button'
import registerTireRepairShopAction from '@/utils/actions/tire-repair-shops/register-tire-repair-shop.action'
import {
  RegisterTireRepairShopRequestDto,
  RegisterTireRepairShopRequestSchema,
  registerTireRepairShopRequestDefaultValues,
} from '@/utils/dtos/tire-repair-shops/register-tire-repair-shop-request.dto'

export default function RegisterTireRepairShopForm() {
  const router = useRouter()
  const form = useForm<RegisterTireRepairShopRequestDto>({
    resolver: zodResolver(RegisterTireRepairShopRequestSchema),
    defaultValues: registerTireRepairShopRequestDefaultValues,
  })

  async function onSubmit(input: RegisterTireRepairShopRequestDto) {
    const [data, error] = await registerTireRepairShopAction(input)

    if (data) {
      toast.success('Berhasil', { description: data.message })
      form.reset()
      router.replace('/')
    }

    if (error) toast.error('Gagal', { description: error.message })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <MoveLeft
              className="stroke-muted-foreground"
              onClick={() => router.back()}
            />
            <p className="text-base font-semibold">Daftar</p>
          </div>
          <SubmitButton
            size="sm"
            disabled={form.formState.isSubmitting}
            className="h-8"
          >
            Kirim
          </SubmitButton>
        </div>

        <div className="space-y-6">
          <FormField
            name="tireRepairShopName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Bengkel Tambal Ban</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="ownerEmail"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Pemilik Bengkel Tambal Ban</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="tireRepairShopLatitude"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Latitude Bengkel Tambal Ban</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="tireRepairShopLongitude"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Longitude Bengkel Tambal Ban</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  )
}
