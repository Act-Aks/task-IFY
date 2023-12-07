'use client'

import { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner'

import { updateBoard } from '@/actions/update-board'
import { FormInput } from '@/components/Form/FormInput'
import { Button } from '@/components/ui/button'
import { useAction } from '@/hooks/useAction'

import { Board } from '@prisma/client'

interface BoardTitleFormProps {
  boardData: Board
}

export const BoardTitleForm = ({ boardData }: BoardTitleFormProps) => {
  const { execute } = useAction(updateBoard, {
    onSuccess(data) {
      console.log(data)
      toast.success(`Board ${data.title} updated`)
      setTitle(data.title)
      disableEditing()
    },
    onError(error) {
      toast.error(error)
    },
  })
  const formRef = useRef<ElementRef<'form'>>(null)
  const inputRef = useRef<ElementRef<'input'>>(null)

  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(boardData.title)

  const disableEditing = () => {
    setIsEditing(false)
  }

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    })
  }

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    execute({ id: boardData.id, title })
  }

  const onBlur = () => {
    formRef.current?.requestSubmit()
  }

  if (isEditing) {
    return (
      <form ref={formRef} action={onSubmit} className='flex items-center gap-x-2'>
        <FormInput
          ref={inputRef}
          id='title'
          onBlur={onBlur}
          defaultValue={title}
          className='text-lg font-bold px-[7px] h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none'
        />
      </form>
    )
  }
  return (
    <Button
      className='font-bold text-lg h-auto w-auto p-1 px-2'
      variant={'transparent'}
      onClick={enableEditing}>
      {title}
    </Button>
  )
}
