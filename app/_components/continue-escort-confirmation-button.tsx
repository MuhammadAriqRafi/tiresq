import { Loader2 } from 'lucide-react'
import { useServerAction } from 'zsa-react'
import { Button } from '@/components/ui/button'
import continueEscort from '@/utils/actions/escorts/continue-escort.action'
import { useOnProgressEscort } from '@/utils/providers/on-progress-escort-provider'

export default function ContinueEscortConfirmationButton() {
  const { onProgressEscort, refreshOnProgressEscort } = useOnProgressEscort()

  const { isPending, execute } = useServerAction(continueEscort, {
    onSuccess() {
      refreshOnProgressEscort()
    },
  })

  return (
    <Button
      onClick={async () =>
        await execute({ escortId: onProgressEscort!.escortId })
      }
    >
      {!isPending && 'Lanjutin'}
      {isPending && <Loader2 className="animate-spin" />}
    </Button>
  )
}
