'use server'

import { CreateSafeAction } from '@/lib/createSafeAction'
import { db } from '@/lib/db'
import { generateRoute } from '@/lib/utils'

import { UpdateBoard } from './schema'
import { UpdateBoardInputType, UpdateBoardReturnType } from './types'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

const handler = async (data: UpdateBoardInputType): Promise<UpdateBoardReturnType> => {
  const { orgId, userId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    }
  }

  const { id, title } = data
  let board

  try {
    board = await db.board.update({
      where: {
        id,
        orgId,
      },
      data: {
        title,
      },
    })
  } catch (error) {
    console.log(error)
    return {
      error: 'Failed to update board',
    }
  }

  revalidatePath(generateRoute('board', { id: board.id }))

  return { data: board }
}

export const updateBoard = CreateSafeAction(UpdateBoard, handler)
