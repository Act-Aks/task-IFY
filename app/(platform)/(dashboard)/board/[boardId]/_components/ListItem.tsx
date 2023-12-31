'use client'

import { ElementRef, useRef, useState } from 'react'

import { cn } from '@/lib/utils'
import { ListWithCards } from '@/types'

import { CardForm } from './CardForm'
import { CardItem } from './CardItem'
import { ListHeader } from './ListHeader'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'

interface ListItemProps {
  list: ListWithCards
  index: number
}

export const ListItem = ({ list, index }: ListItemProps) => {
  const textAreaRef = useRef<ElementRef<'textarea'>>(null)

  const [isEditing, setIsEditing] = useState(false)

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      textAreaRef.current?.focus()
    })
  }

  const disableEditing = () => {
    setIsEditing(false)
  }

  return (
    <Draggable draggableId={list.id} index={index}>
      {provided => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          className='shrink-0 h-full w-[272px] select-none'>
          <div
            {...provided.dragHandleProps}
            className='w-full rounded-md bg-[#F1F2F4] shadow-md pb-2'>
            <ListHeader list={list} onAddCard={enableEditing} />

            <Droppable droppableId={list.id} type='card'>
              {provided => (
                <ol
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn(
                    'mx-1 px-1 py-0.5 flex flex-col gap-y-2',
                    list.cards.length > 0 ? 'mt-2' : 'mt-0',
                  )}>
                  {list.cards.map((card, index) => (
                    <CardItem index={index} key={card.id} card={card} />
                  ))}
                  {provided.placeholder}
                </ol>
              )}
            </Droppable>

            <CardForm
              ref={textAreaRef}
              isEditing={isEditing}
              enableEditing={enableEditing}
              disableEditing={disableEditing}
              listId={list.id}
            />
          </div>
        </li>
      )}
    </Draggable>
  )
}
