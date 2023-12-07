'use server'

import { CreateSafeAction } from '@/lib/createSafeAction'
import { db } from '@/lib/db'

import { CreateBoard } from './schema'
import { CreateBoardInputType, CreateBoardReturnType } from './types'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

const handler = async (data: CreateBoardInputType): Promise<CreateBoardReturnType> => {
  const { userId, orgId } = auth()

  if (!userId) {
    return {
      error: 'Unauthorized',
    }
  }

  const { title, image } = data

  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] = image.split('|')

  if (!imageId || !imageThumbUrl || !imageFullUrl || !imageLinkHTML || !imageUserName || !orgId) {
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
  } catch (error) {
    return {
      error: 'Something went wrong.',
    }
  }

  revalidatePath(`/board/${board.id}`)
  return { data: board }
}

export const createBoard = CreateSafeAction(CreateBoard, handler)
