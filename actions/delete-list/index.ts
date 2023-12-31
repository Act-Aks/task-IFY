'use server'

import { createAuditLog } from '@/lib/createAuditLog'
import { CreateSafeAction } from '@/lib/createSafeAction'
import { db } from '@/lib/db'
import { generateRoute } from '@/lib/utils'

import { DeleteList } from './schema'
import { DeleteListInputType, DeleteListReturnType } from './types'
import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const handler = async (data: DeleteListInputType): Promise<DeleteListReturnType> => {
  const { orgId, userId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    }
  }

  const { id, boardId } = data
  let list

  try {
    list = await db.list.delete({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
    })

    await createAuditLog({
      entityId: list.id,
      entityTitle: list.title,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.DELETE,
    })
  } catch (error) {
    console.log(error)
    return {
      error: 'Failed to delete list',
    }
  }

  revalidatePath(generateRoute('board', { id: boardId }))

  return { data: list }
}

export const deleteList = CreateSafeAction(DeleteList, handler)
