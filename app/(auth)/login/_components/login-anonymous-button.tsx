import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useServerAction } from 'zsa-react'
import { Button } from '@/components/ui/button'
import loginAnonymousAction from '@/utils/actions/auth/login-anonymous.action'

export default function LoginAnonymousButton({
  captchaToken,
}: {
  captchaToken?: string
}) {
  const { isPending, execute } = useServerAction(loginAnonymousAction)

  return (
    <Button
      type="button"
      variant="link"
      onClick={() => {
        toast.promise(
          execute({ captchaToken: captchaToken ?? 'dummyCaptchaToken' }),
          {
            loading: 'Logging In',
            success: 'Selamat datang di TiresQ!',
            error: 'Login Gagal',
          }
        )
      }}
      className="m-0 h-fit p-0 text-xs text-primary underline underline-offset-2"
    >
      {!isPending && 'Masuk Sebagai Tamu'}
      {isPending && <Loader2 className="animate-spin" />}
    </Button>
  )
}
