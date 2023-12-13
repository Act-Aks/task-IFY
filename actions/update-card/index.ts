'use server'

import { createAuditLog } from '@/lib/createAuditLog'
import { CreateSafeAction } from '@/lib/createSafeAction'
import { db } from '@/lib/db'
import { generateRoute } from '@/lib/utils'

import { UpdateCard } from './schema'
import { UpdateCardInputType, UpdateCardReturnType } from './types'
import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const handler = async (data: UpdateCardInputType): Promise<UpdateCardReturnType> => {
  const { orgId, userId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    }
  }

  const { id, boardId, ...values } = data
  let card

  try {
    card = await db.card.update({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
      data: { ...values },
    })

    await createAuditLog({
      entityId: card.id,
      entityTitle: card.title,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.UPDATE,
    })
  } catch (error) {
    console.log(error)
    return {
      error: 'Failed to update card',
    }
  }

  revalidatePath(generateRoute('board', { id: boardId }))

  return { data: card }
}

export const updateCard = CreateSafeAction(UpdateCard, handler)
