'use server'

import { CreateSafeAction } from '@/lib/createSafeAction'
import { db } from '@/lib/db'
import { generateRoute } from '@/lib/utils'

import { UpdateCardOrder } from './schema'
import { UpdateCardOrderInputType, UpdateCardOrderReturnType } from './types'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

const handler = async (data: UpdateCardOrderInputType): Promise<UpdateCardOrderReturnType> => {
  const { orgId, userId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    }
  }

  const { boardId, items } = data
  let cards

  try {
    const transactions = items.map(card =>
      db.card.update({
        where: {
          id: card.id,
          list: {
            board: {
              orgId,
            },
          },
        },
        data: {
          order: card.order,
          listId: card.listId,
        },
      }),
    )

    cards = await db.$transaction(transactions)
  } catch (error) {
    console.log(error)
    return {
      error: 'Failed to reorder cards',
    }
  }

  revalidatePath(generateRoute('board', { id: boardId }))

  return { data: cards }
}

export const updateCardOrder = CreateSafeAction(UpdateCardOrder, handler)
