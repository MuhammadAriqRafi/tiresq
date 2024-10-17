'use client'

import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Input } from '@/components/ui/input'

export default function InputPassword(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="flex w-full items-center gap-3">
      <Input type={isVisible ? 'text' : 'password'} {...props} />

      {isVisible ? (
        <Eye
          className="stroke-primary"
          onClick={() => setIsVisible(!isVisible)}
        />
      ) : (
        <EyeOff
          className="stroke-muted-foreground"
          onClick={() => setIsVisible(!isVisible)}
        />
      )}
    </div>
  )
}
