'use server'

import { createAuditLog } from '@/lib/createAuditLog'
import { CreateSafeAction } from '@/lib/createSafeAction'
import { db } from '@/lib/db'
import { decrementAvailableCount } from '@/lib/organizationLimit'
import { checkSubscription } from '@/lib/subscription'
import { generateRoute } from '@/lib/utils'

import { DeleteBoard } from './schema'
import { DeleteBoardInputType, DeleteBoardReturnType } from './types'
import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const handler = async (data: DeleteBoardInputType): Promise<DeleteBoardReturnType> => {
  const { orgId, userId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    }
  }

  const isPro = await checkSubscription()

  const { id } = data
  let board

  try {
    board = await db.board.delete({
      where: {
        id,
        orgId,
      },
    })

    if (!isPro) {
      await decrementAvailableCount()
    }

    await createAuditLog({
      entityId: board.id,
      entityTitle: board.title,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.DELETE,
    })
  } catch (error) {
    console.log(error)
    return {
      error: 'Failed to delete board',
    }
  }

  revalidatePath(generateRoute('organization', { id: orgId }))
  redirect(generateRoute('organization', { id: orgId }))
}

export const deleteBoard = CreateSafeAction(DeleteBoard, handler)
