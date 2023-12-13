'use server'

import { CreateSafeAction } from '@/lib/createSafeAction'
import { db } from '@/lib/db'
import { generateRoute } from '@/lib/utils'

import { UpdateListOrder } from './schema'
import { UpdateListOrderInputType, UpdateListOrderReturnType } from './types'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

const handler = async (data: UpdateListOrderInputType): Promise<UpdateListOrderReturnType> => {
  const { orgId, userId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    }
  }

  const { boardId, items } = data
  let lists

  try {
    const transactions = items.map(list =>
      db.list.update({
        where: { id: list.id, board: { orgId } },
        data: { order: list.order },
      }),
    )

    lists = await db.$transaction(transactions)
  } catch (error) {
    console.log(error)
    return {
      error: 'Failed to reorder list',
    }
  }

  revalidatePath(generateRoute('board', { id: boardId }))

  return { data: lists }
}

export const updateListOrder = CreateSafeAction(UpdateListOrder, handler)
