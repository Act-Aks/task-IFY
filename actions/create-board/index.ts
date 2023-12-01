'use server'

import { CreateSafeAction } from '@/lib/createSafeAction'
import { db } from '@/lib/db'

import { CreateBoard } from './schema'
import { CreateBoardInputType, CreateBoardReturnType } from './types'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

const handler = async (data: CreateBoardInputType): Promise<CreateBoardReturnType> => {
  const { userId } = auth()

  if (!userId) {
    return {
      error: 'Unauthorized',
    }
  }

  const { title } = data

  let board

  try {
    board = await db.board.create({
      data: {
        title,
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
