'use server'

import { createAuditLog } from '@/lib/createAuditLog'
import { CreateSafeAction } from '@/lib/createSafeAction'
import { db } from '@/lib/db'
import { generateRoute } from '@/lib/utils'

import { UpdateList } from './schema'
import { UpdateListInputType, UpdateListReturnType } from './types'
import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const handler = async (data: UpdateListInputType): Promise<UpdateListReturnType> => {
  const { orgId, userId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    }
  }

  const { id, title, boardId } = data
  let list

  try {
    list = await db.list.update({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
      data: {
        title,
      },
    })

    await createAuditLog({
      entityId: list.id,
      entityTitle: list.title,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.UPDATE,
    })
  } catch (error) {
    console.log(error)
    return {
      error: 'Failed to update list',
    }
  }

  revalidatePath(generateRoute('board', { id: boardId }))

  return { data: list }
}

export const updateList = CreateSafeAction(UpdateList, handler)
