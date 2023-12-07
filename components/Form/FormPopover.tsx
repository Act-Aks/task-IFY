'use client'

import { X } from 'lucide-react'
import { ElementRef, useRef } from 'react'
import { toast } from 'sonner'

import { createBoard } from '@/actions/create-board'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useAction } from '@/hooks/useAction'
import { generateRoute } from '@/lib/utils'

import { Button } from '../ui/button'
import { FormButton } from './FormButton'
import { FormInput } from './FormInput'
import { FormPicker } from './FormPicker'
import { useRouter } from 'next/navigation'

interface FormPopoverProps {
  children: React.ReactNode
  side?: 'top' | 'bottom' | 'left' | 'right'
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
}

export const FormPopover = ({
  children,
  side = 'bottom',
  align = 'center',
  sideOffset = 0,
}: FormPopoverProps) => {
  const router = useRouter()
  const closeRef = useRef<ElementRef<'button'>>(null)
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess(data) {
      toast.success('Board created')
      closeRef.current?.click()
      router.push(generateRoute('board', { id: data.id }))
    },
    onError(error) {
      console.log(error)
      toast.error(error)
    },
  })

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    const image = formData.get('image') as string

    execute({ title, image })
  }

  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        side={side}
        sideOffset={sideOffset}
        className='w-80 pt-3 lg:ml-4'>
        <div className='text-sm font-semibold text-center text-violet-600 pb-4'>Create board</div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className='w-auto h-auto p-2 absolute top-2 right-2 text-neutral-600'
            variant={'ghost'}>
            <X className='h-4 w-4' />
          </Button>
        </PopoverClose>
        <form className='space-y-4' action={onSubmit}>
          <div className='space-y-4'>
            <FormPicker id='image' errors={fieldErrors} />
            <FormInput id='title' label='Board title' type='text' errors={fieldErrors} />
          </div>
          <FormButton className='w-full'>Create</FormButton>
        </form>
      </PopoverContent>
    </Popover>
  )
}
