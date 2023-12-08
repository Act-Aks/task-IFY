'use client'

import { useEffect, useState } from 'react'

import { ListWithCards } from '@/types'

import { ListForm } from './ListForm'
import { ListItem } from './ListItem'

interface ListContainerProps {
  data: ListWithCards[]
  boardId: string
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [ordredLists, setOrdredLists] = useState<ListWithCards[]>(data)

  useEffect(() => {
    setOrdredLists(data)
  }, [data])

  return (
    <ol className='flex gap-x-3 h-full'>
      {ordredLists.map((list, index) => (
        <ListItem key={list.id} list={list} index={index} />
      ))}
      <ListForm />
      <div className='flex-shrink-0 w-1'>List</div>
    </ol>
  )
}
