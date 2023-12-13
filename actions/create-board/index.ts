'use server'

import { createAuditLog } from '@/lib/createAuditLog'
import { CreateSafeAction } from '@/lib/createSafeAction'
import { db } from '@/lib/db'
import { hasAvailableCount, incrementAvailableCount } from '@/lib/organizationLimit'
import { checkSubscription } from '@/lib/subscription'

import { CreateBoard } from './schema'
import { CreateBoardInputType, CreateBoardReturnType } from './types'
import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const handler = async (data: CreateBoardInputType): Promise<CreateBoardReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    }
  }

  const canCreateBoard = await hasAvailableCount()
  const isPro = await checkSubscription()

  if (!canCreateBoard && !isPro) {
    return {
      error: 'You have reached your limit of free boards. Please upgrade to create more.',
    }
  }

  const { title, image } = data

  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] = image.split('|')

  if (!imageId || !imageThumbUrl || !imageFullUrl || !imageLinkHTML || !imageUserName) {
    return {
      error: 'Missing fields. Failed to create board.',
    }
  }

  let board

  try {
    board = await db.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageUserName,
        imageLinkHTML,
      },
    })

    if (!isPro) {
      await incrementAvailableCount()
    }

    await createAuditLog({
      entityId: board.id,
      entityTitle: board.title,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.CREATE,
    })
  } catch (error) {
    return {
      error: 'Something went wrong.',
    }
  }

  revalidatePath(`/board/${board.id}`)
  return { data: board }
}

export const createBoard = CreateSafeAction(CreateBoard, handler)
