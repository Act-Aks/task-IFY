'use client'

import { forwardRef } from 'react'
import { useFormStatus } from 'react-dom'

import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

import { FormErrors } from './FormErrors'

type FormTextAreaProps = {
  id: string
  label?: string
  errors?: Record<string, string[] | undefined>
} & Pick<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  | 'placeholder'
  | 'required'
  | 'disabled'
  | 'className'
  | 'defaultValue'
  | 'onBlur'
  | 'onClick'
  | 'onKeyDown'
>

export const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
  ({ id, label, errors, className, disabled, ...props }, ref) => {
    const { pending } = useFormStatus()

    return (
      <div className='space-y-2 w-full'>
        <div className='space-y-1 w-full'>
          {label && (
            <Label htmlFor={id} className='text-sm font-medium text-neutral-700'>
              {label}
            </Label>
          )}
          <Textarea
            id={id}
            name={id}
            ref={ref}
            disabled={disabled || pending}
            aria-describedby={`${id}-error`}
            className={cn(
              'resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm',
              className,
            )}
            {...props}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    )
  },
)

FormTextArea.displayName = 'FormTextArea'
