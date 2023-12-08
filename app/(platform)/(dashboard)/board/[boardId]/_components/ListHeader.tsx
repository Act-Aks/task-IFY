'use client'

import { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useEventListener } from 'usehooks-ts'

import { updateList } from '@/actions/update-list'
import { FormInput } from '@/components/Form/FormInput'
import { useAction } from '@/hooks/useAction'
import { ListWithCards } from '@/types'

import { ListOptions } from './ListOptions'

interface ListHeaderProps {
  list: ListWithCards
  onAddCard: () => void
}

export const ListHeader = ({ list, onAddCard }: ListHeaderProps) => {
  const [title, setTitle] = useState(list.title)
  const [isEditing, setIsEditing] = useState(false)

  const formRef = useRef<ElementRef<'form'>>(null)
  const inputRef = useRef<ElementRef<'input'>>(null)

  const { execute } = useAction(updateList, {
    onSuccess(data) {
      toast.success(`Renamed to ${data.title}`)
      setTitle(data.title)
      disableEditing()
    },
    onError(error) {
      toast.error(error)
    },
  })

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    })
  }

  const disableEditing = () => {
    setIsEditing(false)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      formRef.current?.requestSubmit()
    }
  }

  useEventListener('keydown', onKeyDown)

  const onSubmit = (formDat: FormData) => {
    const data = {
      id: formDat.get('id') as string,
      title: formDat.get('title') as string,
      boardId: formDat.get('boardId') as string,
    }

    if (title === data.title) {
      return disableEditing()
    }

    execute(data)
  }

  const onBlur = () => {
    formRef.current?.requestSubmit()
  }

  return (
    <div className='pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2'>
      {isEditing ? (
        <form action={onSubmit} ref={formRef} className='flex-1 px-[2px]'>
          <input hidden id='id' name='id' defaultValue={list.id} />
          <input hidden id='boardId' name='boardId' defaultValue={list.boardId} />
          <FormInput
            ref={inputRef}
            id='title'
            onBlur={onBlur}
            placeholder='Enter list title...'
            defaultValue={title}
            className='text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white'
          />
          <button type='submit' hidden />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className='w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent'>
          {title}
        </div>
      )}

      <ListOptions onAddCard={onAddCard} list={list} />
    </div>
  )
}
