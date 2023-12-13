'use client'

import { Plus, X } from 'lucide-react'
import { ElementRef, forwardRef, useRef } from 'react'
import { toast } from 'sonner'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

import { createCard } from '@/actions/create-card'
import { FormButton } from '@/components/Form/FormButton'
import { FormTextArea } from '@/components/Form/FormTextArea'
import { Button } from '@/components/ui/button'
import { useAction } from '@/hooks/useAction'

import { useParams } from 'next/navigation'

interface CardFormProps {
  listId: string
  isEditing: boolean
  enableEditing: () => void
  disableEditing: () => void
  ref: React.RefObject<HTMLTextAreaElement>
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ isEditing, listId, enableEditing, disableEditing }, ref) => {
    const params = useParams()
    const formRef = useRef<ElementRef<'form'>>(null)

    const { execute, fieldErrors } = useAction(createCard, {
      onSuccess(data) {
        toast.success(`Card ${data.title} created`)
        formRef.current?.reset()
      },
      onError(error) {
        toast.error(error)
      },
    })

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        disableEditing()
      }
    }

    useOnClickOutside(formRef, disableEditing)
    useEventListener('keydown', onKeyDown)

    const onTextAreaKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        formRef.current?.requestSubmit()
      }
    }

    const onSubmit = (formData: FormData) => {
      const data = {
        title: formData.get('title') as string,
        listId: formData.get('listId') as string,
        boardId: params.boardId as string,
      }

      execute(data)
    }

    if (isEditing) {
      return (
        <form action={onSubmit} ref={formRef} className='m-1 py-0.5 px-1 space-y-4'>
          <FormTextArea
            id='title'
            ref={ref}
            onKeyDown={onTextAreaKeyDown}
            placeholder='Enter a title for this card...'
            errors={fieldErrors}
          />
          <input hidden id='listId' name='listId' value={listId} readOnly />
          <div className='flex items-center gap-x-1'>
            <FormButton>Add card</FormButton>
            <Button onClick={disableEditing} variant={'ghost'} size={'sm'}>
              <X className='h-5 w-5' />
            </Button>
          </div>
        </form>
      )
    }

    return (
      <div className='pt-2 px-2'>
        <Button
          onClick={enableEditing}
          className='h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm'
          size={'sm'}
          variant={'ghost'}>
          <Plus className='h-4 w-4 mr-2' />
          Add a card
        </Button>
      </div>
    )
  },
)

CardForm.displayName = 'CardForm'
