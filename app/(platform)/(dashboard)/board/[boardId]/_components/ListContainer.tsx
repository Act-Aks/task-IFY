'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { updateCardOrder } from '@/actions/update-card-order'
import { updateListOrder } from '@/actions/update-list-order'
import { useAction } from '@/hooks/useAction'
import { ListWithCards } from '@/types'

import { ListForm } from './ListForm'
import { ListItem } from './ListItem'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'

interface ListContainerProps {
  data: ListWithCards[]
  boardId: string
}

function reOrder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [ordredLists, setOrdredLists] = useState<ListWithCards[]>(data)
  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onSuccess() {
      toast.success('List reordered')
    },
    onError(error) {
      toast.error(error)
    },
  })

  const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
    onSuccess() {
      toast.success('Card reordered')
    },
    onError(error) {
      toast.error(error)
    },
  })

  useEffect(() => {
    setOrdredLists(data)
  }, [data])

  const onDragEnd = (result: any) => {
    const { source, destination, type } = result

    if (!result.destination) {
      return
    }

    // dropped at same position
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    // when moving list
    if (type === 'list') {
      const newLists = reOrder(ordredLists, source.index, destination.index).map((list, index) => ({
        ...list,
        order: index,
      }))

      setOrdredLists(newLists)
      executeUpdateListOrder({ boardId, items: newLists })
    }

    // when moving card
    if (type === 'card') {
      const newOrderedLists = [...ordredLists]

      const sourceList = newOrderedLists.find(list => list.id === source.droppableId)
      const destinationList = newOrderedLists.find(list => list.id === destination.droppableId)

      if (!sourceList || !destinationList) {
        return
      }

      // check if cards exists on source list
      if (!sourceList.cards) {
        sourceList.cards = []
      }

      // check if cards exists on destination list
      if (!destinationList.cards) {
        destinationList.cards = []
      }

      // moving card in the same list
      if (source.droppableId === destination.droppableId) {
        const reOrderedCards = reOrder(sourceList.cards, source.index, destination.index)

        reOrderedCards.forEach((card, index) => {
          card.order = index
        })

        sourceList.cards = reOrderedCards

        setOrdredLists(newOrderedLists)
        executeUpdateCardOrder({ boardId, items: reOrderedCards })
      } else {
        // removed card from source list
        const [movedCard] = sourceList.cards.splice(source.index, 1)
        // assign new listId to moved card
        movedCard.listId = destination.droppableId
        // add card to destination list
        destinationList.cards.splice(destination.index, 0, movedCard)

        sourceList.cards.forEach((card, index) => {
          card.order = index
        })

        // update order of destination list
        destinationList.cards.forEach((card, index) => {
          card.order = index
        })

        setOrdredLists(newOrderedLists)
        executeUpdateCardOrder({ boardId, items: destinationList.cards })
      }
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={() => {}} onDragUpdate={() => {}}>
      <Droppable droppableId={'lists'} type='list' direction='horizontal'>
        {provided => (
          <ol ref={provided.innerRef} {...provided.droppableProps} className='flex gap-x-3 h-full'>
            {ordredLists.map((list, index) => (
              <ListItem key={list.id} list={list} index={index} />
            ))}
            {provided.placeholder}
            <ListForm />
            <div className='flex-shrink-0 w-1'>List</div>
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  )
}
