'use client'

import { useFormStatus } from 'react-dom'

import { Button, ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type FormButtonProps = Pick<ButtonProps, 'disabled' | 'className' | 'variant' | 'children' | 'size'>

export const FormButton = ({ children, disabled, variant, className, size }: FormButtonProps) => {
  const { pending } = useFormStatus()
  return (
    <Button
      disabled={pending || disabled}
      variant={variant}
      className={cn(className)}
      type={'submit'}
      size={size || 'sm'}>
      {children}
    </Button>
  )
}
