import { toast } from 'sonner'
import { useServerAction } from 'zsa-react'
import { Button } from '@/components/ui/button'
import loginAnonymousAction from '@/utils/actions/auth/login-anonymous.action'

export default function LoginAnonymousButton() {
  const { execute } = useServerAction(loginAnonymousAction)

  return (
    <Button
      type="button"
      variant="link"
      onClick={() => {
        toast.promise(execute({ captchaToken: 'dummyCaptchaToken' }), {
          loading: 'Loading...',
          success: 'Login Berhasil',
          error: 'Login Gagal',
        })
      }}
      className="m-0 h-fit p-0 text-xs text-primary underline underline-offset-2"
    >
      Masuk Sebagai Tamu
    </Button>
  )
}
