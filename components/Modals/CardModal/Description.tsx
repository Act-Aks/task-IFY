'use client'

import { AlignLeft } from 'lucide-react'
import { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

import { updateCard } from '@/actions/update-card'
import { FormButton } from '@/components/Form/FormButton'
import { FormTextArea } from '@/components/Form/FormTextArea'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useAction } from '@/hooks/useAction'
import { CardWithList } from '@/types'

import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

interface DescriptionProps {
  data: CardWithList
}

export const Description = ({ data }: DescriptionProps) => {
  const params = useParams()
  const queryClient = useQueryClient()

  const formRef = useRef<ElementRef<'form'>>(null)
  const textAreaRef = useRef<ElementRef<'textarea'>>(null)

  const [isEditing, setIsEditing] = useState(false)

  const { execute: executeUpdateCard, fieldErrors } = useAction(updateCard, {
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ['card', data.id] })
      queryClient.invalidateQueries({ queryKey: ['card-logs', data.id] })
      toast.success(`Card ${data.title} updated`)
      disableEditing()
    },
    onError(error) {
      toast.error(error)
    },
  })

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      textAreaRef.current?.focus()
    })
  }

  const disableEditing = () => {
    setIsEditing(false)
  }

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      disableEditing()
    }
  }

  useEventListener('keydown', onKeyDown)
  useOnClickOutside(formRef, disableEditing)

  const onSubmit = (formDat: FormData) => {
    const description = formDat.get('description') as string
    const boardId = params.boardId as string

    executeUpdateCard({ id: data.id, description, boardId })
  }

  return (
    <div className='flex items-start gap-x-3 w-full'>
      <AlignLeft className='h-5 w-5 mt-0.5 text-neutral-700' />
      <div className='w-full'>
        <p className='font-semibold text-neutral-700 mb-2'>Description</p>
        {isEditing ? (
          <form ref={formRef} action={onSubmit} className='space-y-2'>
            <FormTextArea
              id='description'
              ref={textAreaRef}
              defaultValue={data.description || undefined}
              errors={fieldErrors}
              className='w-full mt-2'
              placeholder='Add a more detailed description'
            />
            <div className='flex items-center gap-x-2'>
              <FormButton>Save</FormButton>
              <Button onClick={disableEditing} variant={'ghost'} size={'sm'} type='button'>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            onClick={enableEditing}
            role='button'
            className='min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md'>
            {data.description || 'Add detailed description...'}
          </div>
        )}
      </div>
    </div>
  )
}

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div className='w-full flex items-start gap-x-3'>
      <Skeleton className='h-6 w-6 bg-neutral-200' />
      <div className='w-full'>
        <Skeleton className='h-6 w-24 mb-2 bg-neutral-200' />
        <Skeleton className='w-full h-[78px] bg-neutral-200' />
      </div>
    </div>
  )
}
