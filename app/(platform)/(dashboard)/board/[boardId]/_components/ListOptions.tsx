'use client'

import { MoreHorizontal, X } from 'lucide-react'
import { ElementRef, useRef } from 'react'
import { toast } from 'sonner'

import { copyList } from '@/actions/copy-list'
import { deleteList } from '@/actions/delete-list'
import { FormButton } from '@/components/Form/FormButton'
import { Button } from '@/components/ui/button'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { useAction } from '@/hooks/useAction'

import { List } from '@prisma/client'

interface ListOptionsProps {
  list: List
  onAddCard: () => void
}

export const ListOptions = ({ list, onAddCard }: ListOptionsProps) => {
  const closeRef = useRef<ElementRef<'button'>>(null)

  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess(data) {
      toast.success(`List ${data.title} deleted`)
      closeRef.current?.click()
    },
    onError(error) {
      toast.error(error)
    },
  })

  const { execute: executeCopy } = useAction(copyList, {
    onSuccess(data) {
      toast.success(`List ${data.title} copied`)
      closeRef.current?.click()
    },
    onError(error) {
      toast.error(error)
    },
  })

  const onDelete = (formData: FormData) => {
    const id = formData.get('id') as string
    const boardId = formData.get('boardId') as string

    executeDelete({ id, boardId })
  }

  const onCopy = (formData: FormData) => {
    const id = formData.get('id') as string
    const boardId = formData.get('boardId') as string

    executeCopy({ id, boardId })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className='h-auto w-auto p-2' variant={'ghost'}>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='px-0 pt-3 pb-3' side='bottom' align='start'>
        <div className='text-sm font-medium text-center text-violet-600 pb-4'>List actions</div>

        <PopoverClose ref={closeRef} asChild>
          <Button
            className='h-auto w-auto p-2 absolute top-2 right-2 text-violet-600'
            variant={'ghost'}>
            <X className='h-4 w-4' />
          </Button>
        </PopoverClose>

        <Button
          variant={'ghost'}
          className='w-full rounded-none h-auto p-2 px-5 justify-start font-normal text-sm hover:text-violet-700 text-violet-600 hover:bg-gradient-to-r hover:from-fuchsia-600/5 hover:to-violet-600/5'
          onClick={onAddCard}>
          Add card...
        </Button>

        <form action={onCopy}>
          <input type='hidden' id='id' name='id' value={list.id} />
          <input type='hidden' id='boardId' name='boardId' value={list.boardId} />
          <FormButton
            className='w-full rounded-none h-auto p-2 px-5 justify-start font-normal text-sm hover:text-violet-700 text-violet-600 hover:bg-gradient-to-r hover:from-fuchsia-600/5 hover:to-violet-600/5'
            variant={'ghost'}>
            Copy list...
          </FormButton>
        </form>

        <Separator />

        <form action={onDelete}>
          <input type='hidden' id='id' name='id' value={list.id} />
          <input type='hidden' id='boardId' name='boardId' value={list.boardId} />
          <FormButton
            className='w-full rounded-none h-auto p-2 px-5 justify-start font-normal text-sm hover:text-red-700 text-red-600 hover:bg-gradient-to-r hover:from-fuchsia-600/5 hover:to-violet-600/5'
            variant={'ghost'}>
            Delete this list
          </FormButton>
        </form>
      </PopoverContent>
    </Popover>
  )
}
