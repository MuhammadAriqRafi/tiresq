import { Loader2 } from 'lucide-react'
import { FormEvent, useContext, useState } from 'react'
import { useServerAction } from 'zsa-react'
import { formatInputParseErrorOutput } from '@/lib/utils'
import cancelTripConfirmation from '@/app/_actions/cancel-trip-confirmation.action'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import InputParseError from '@/components/ui/input-parse-error'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useToast } from '@/utils/hooks/use-toast'
import { UserOnProgressTripContext } from '@/utils/providers/user-on-progress-trip-provider'

export default function CancelTripConfirmationButton() {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const { onProgressTrip, setOnProgressTrip } = useContext(
    UserOnProgressTripContext
  )
  const { isPending, execute } = useServerAction(cancelTripConfirmation, {
    bind: { tripId: onProgressTrip?.tripId },
    onSuccess() {
      setOpen(false)
      setOnProgressTrip(null)
    },
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
    await execute(formData)
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Batalin</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Yakin mau batalin perjalanannya?</DrawerTitle>
          <DrawerDescription>Tolong beritahu kami alasannya</DrawerDescription>
        </DrawerHeader>

        <form onSubmit={handleOnSubmit} method="POST">
          <div className="p-4 pt-0">
            <RadioGroup name="cause">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="CANCEL" id="cancel" />
                <Label htmlFor="cancel">Saya mau ganti perjalanan baru</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="COMPLETE" id="complete" />
                <Label htmlFor="complete">Saya sudah sampai tujuan</Label>
              </div>
            </RadioGroup>
          </div>

          <DrawerFooter className="flex w-full flex-row gap-2 [&>button]:w-1/2">
            <Button
              type="submit"
              variant="outline"
              className="border-destructive text-destructive"
            >
              {!isPending && 'Batalin'}
              {isPending && <Loader2 className="animate-spin" />}
            </Button>

            <DrawerClose asChild>
              <Button variant="outline">Gajadi</Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  )
}
