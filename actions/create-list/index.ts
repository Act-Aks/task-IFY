'use server'

import { createAuditLog } from '@/lib/createAuditLog'
import { CreateSafeAction } from '@/lib/createSafeAction'
import { db } from '@/lib/db'
import { generateRoute } from '@/lib/utils'

import { CreateList } from './schema'
import { CreateListInputType, CreateListReturnType } from './types'
import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const handler = async (data: CreateListInputType): Promise<CreateListReturnType> => {
  const { orgId, userId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    }
  }

  const { boardId, title } = data
  let list

  try {
    const board = await db.board.findUnique({
      where: {
        id: boardId,
        orgId,
      },
    })

    if (!board) {
      return {
        error: 'Board not found',
      }
    }

    const lastList = await db.list.findFirst({
      where: { boardId },
      orderBy: { order: 'desc' },
      select: { order: true },
    })

    const newOrder = lastList ? lastList.order + 1 : 1

    list = await db.list.create({
      data: {
        title,
        boardId,
        order: newOrder,
      },
    })

    await createAuditLog({
      entityId: list.id,
      entityTitle: list.title,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.CREATE,
    })
  } catch (error) {
    console.log(error)
    return {
      error: 'Failed to create list',
    }
  }

  revalidatePath(generateRoute('board', { id: boardId }))

  return { data: list }
}

export const createList = CreateSafeAction(CreateList, handler)
