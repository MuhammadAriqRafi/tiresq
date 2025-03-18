import { Loader2 } from 'lucide-react'
import { Button, ButtonProps } from '@/components/ui/button'

export default function SubmitButton(props: ButtonProps) {
  return (
    <Button type="submit" {...props}>
      {!props.disabled && props.children}
      {props.disabled && <Loader2 className="animate-spin" />}
    </Button>
  )
}
