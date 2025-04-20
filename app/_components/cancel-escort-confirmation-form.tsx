import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { DrawerClose, DrawerFooter } from '@/components/ui/drawer'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import SubmitButton from '@/components/submit-button'
import cancelEscortConfirmationAction from '@/utils/actions/escorts/cancel-escort-confirmation.action'
import {
  CancelEscortConfirmationRequestDto,
  CancelEscortConfirmationRequestSchema,
  cancelEscortConfirmationRequestDefaultValue,
} from '@/utils/dtos/escorts/cancel-escort-confirmation-request.dto'
import { useOnProgressEscort } from '@/utils/providers/on-progress-escort-provider'

export default function CancelEscortConfirmationForm() {
  const { onProgressEscort, refreshOnProgressEscort } = useOnProgressEscort()
  const form = useForm<CancelEscortConfirmationRequestDto>({
    resolver: zodResolver(CancelEscortConfirmationRequestSchema),
    defaultValues: {
      ...cancelEscortConfirmationRequestDefaultValue,
      escortId: onProgressEscort?.escortId,
    },
  })

  async function onSubmit(input: CancelEscortConfirmationRequestDto) {
    const [data, error] = await cancelEscortConfirmationAction(input)

    if (data) {
      toast.success('Berhasil', { description: data.message })
      refreshOnProgressEscort()
    }

    if (error) toast.error('Gagal', { description: error.message })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="cause"
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-3 p-4">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="CANCEL" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Saya mau ganti perjalanan baru
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="COMPLETE" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Saya sudah sampai tujuan
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DrawerFooter className="flex w-full flex-row gap-2 [&>button]:w-1/2">
          <SubmitButton
            variant="outline"
            disabled={form.formState.isSubmitting}
            className="border-destructive text-destructive hover:bg-background hover:text-destructive"
          >
            Batalin
          </SubmitButton>

          <DrawerClose asChild>
            <Button type="button" variant="outline">
              Gajadi
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </form>
    </Form>
  )
}
