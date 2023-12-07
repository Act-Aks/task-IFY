'use client'

import { Plus, X } from 'lucide-react'
import { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

import { createList } from '@/actions/create-list'
import { FormButton } from '@/components/Form/FormButton'
import { FormInput } from '@/components/Form/FormInput'
import { Button } from '@/components/ui/button'
import { useAction } from '@/hooks/useAction'

import { ListWrapper } from './ListWrapper'
import { useParams, useRouter } from 'next/navigation'

export const ListForm = () => {
  const formRef = useRef<ElementRef<'form'>>(null)
  const inputRef = useRef<ElementRef<'input'>>(null)
  const params = useParams()
  const router = useRouter()

  const { execute, fieldErrors } = useAction(createList, {
    onSuccess(data) {
      toast.success(`List ${data.title} created`)
      disableEditing()
      router.refresh()
    },
    onError(error) {
      toast.error(error)
    },
  })

  const [isEditing, setIsEditing] = useState(false)

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
    })
  }

  const disableEditing = () => {
    setIsEditing(false)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      disableEditing()
    }
  }

  useEventListener('keydown', onKeyDown)
  useOnClickOutside(formRef, disableEditing)

  const onSubmit = (formData: FormData) => {
    const data = {
      title: formData.get('title') as string,
      boardId: params.boardId as string,
    }
    execute(data)
  }

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          ref={formRef}
          action={onSubmit}
          className='w-full p-3 rounded-md bg-white space-y-4 shadow-md'>
          <FormInput
            ref={inputRef}
            id='title'
            errors={fieldErrors}
            className='text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition'
            placeholder='Enter list title...'
          />

          <input hidden readOnly value={params.boardId} name='boardId' />
          <div className='flex items-center gap-x-1'>
            <FormButton>Add list</FormButton>
            <Button onClick={disableEditing} size={'sm'} variant={'ghost'}>
              <X className='h-5 w-5' />
            </Button>
          </div>
        </form>
      </ListWrapper>
    )
  }

  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className='w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm'>
        <Plus className='h-4 w-4 mr-2' />
        Add a list
      </button>
    </ListWrapper>
  )
}
