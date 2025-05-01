'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MoveLeft } from 'lucide-react'
import { useRouter } from 'nextjs-toploader/app'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { capitalize, cn } from '@/lib/utils'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Switch } from '@/components/ui/switch'
import SubmitButton from '@/components/submit-button'
import updateTireRepairShopDetailAction from '@/utils/actions/tire-repair-shops/update-tire-repair-shop-detail.action'
import {
  UpdateTireRepairShopDetailRequestDto,
  UpdateTireRepairShopDetailRequestSchema,
} from '@/utils/dtos/tire-repair-shops/update-tire-repair-shop-request.dto'

export default function UpdateTireRepairShopDetailForm({
  tireRepairShopId,
  tireRepairShopName,
  tireRepairShopOperatingHours,
  tireRepairShopServiceCostInRupiah,
}: {
  tireRepairShopId: string
  tireRepairShopName: string
  tireRepairShopServiceCostInRupiah: number
  tireRepairShopOperatingHours: OperatingHour[]
}) {
  const router = useRouter()
  const form = useForm<UpdateTireRepairShopDetailRequestDto>({
    resolver: zodResolver(UpdateTireRepairShopDetailRequestSchema),
    defaultValues: {
      tireRepairShopId,
      tireRepairShopName,
      tireRepairShopServiceCostInRupiah,
      operatingHours: tireRepairShopOperatingHours,
    },
  })
  const { fields } = useFieldArray({
    name: 'operatingHours',
    control: form.control,
  })

  async function onSubmit(input: UpdateTireRepairShopDetailRequestDto) {
    const [data, error] = await updateTireRepairShopDetailAction(input)

    if (data) {
      toast.success('Berhasil', { description: data.message })
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
            <p className="text-base font-semibold">Ubah Informasi</p>
          </div>
          <SubmitButton
            size="sm"
            disabled={form.formState.isSubmitting}
            className="h-8"
          >
            Kirim
          </SubmitButton>
        </div>

        <ScrollArea className="h-[calc(100dvh-110px)]">
          <div className="space-y-6 px-1">
            <FormField
              name="tireRepairShopName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Tambal Ban</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="tireRepairShopServiceCostInRupiah"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Biaya Tambal Ban</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <p className="text-xs">Jam Operasional</p>
              {fields.length > 0 &&
                fields.map(({ id, daysOfWeek }, index) => {
                  return (
                    <div
                      key={id}
                      className={cn(
                        'flex items-center justify-between',
                        form.watch(`operatingHours.${index}.isHoliday`) &&
                          'opacity-50'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <FormField
                          name={`operatingHours.${index}.isHoliday`}
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Switch
                                  checked={!field.value}
                                  onCheckedChange={(value) => {
                                    field.onChange(!value)
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <p className="text-sm">{capitalize(daysOfWeek)}</p>
                      </div>

                      <div className="flex max-w-[60%] items-center gap-3">
                        <FormField
                          name={`operatingHours.${index}.openTime`}
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="time"
                                  className="w-16"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <span>—</span>
                        <FormField
                          name={`operatingHours.${index}.closeTime`}
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="time"
                                  className="w-16"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        </ScrollArea>
      </form>
    </Form>
  )
}
