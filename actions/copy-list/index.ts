'use server'

import { CreateSafeAction } from '@/lib/createSafeAction'
import { db } from '@/lib/db'
import { generateRoute } from '@/lib/utils'

import { CopyList } from './schema'
import { CopyListInputType, CopyListReturnType } from './types'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

const handler = async (data: CopyListInputType): Promise<CopyListReturnType> => {
  const { orgId, userId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    }
  }

  const { id, boardId } = data
  let list

  try {
    const listToCopy = await db.list.findUnique({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
      include: { cards: true },
    })

    if (!listToCopy) {
      return { error: 'List not found' }
    }

    const lastList = await db.list.findFirst({
      where: { boardId },
      orderBy: { order: 'desc' },
      select: { order: true },
    })

    const newOrder = lastList ? lastList.order + 1 : 1

    list = await db.list.create({
      data: {
        title: `${listToCopy.title} - Copy`,
        boardId: listToCopy.boardId,
        order: newOrder,
        cards: {
          createMany: {
            data: listToCopy.cards.map(card => ({
              title: card.title,
              description: card.description,
              order: card.order,
            })),
          },
        },
      },
      include: { cards: true },
    })
  } catch (error) {
    console.log(error)
    return {
      error: 'Failed to copy list',
    }
  }

  revalidatePath(generateRoute('board', { id: boardId }))

  return { data: list }
}

export const copyList = CreateSafeAction(CopyList, handler)
