'use server'

import { CreateSafeAction } from '@/lib/createSafeAction'
import { db } from '@/lib/db'
import { generateRoute } from '@/lib/utils'

import { DeleteBoard } from './schema'
import { DeleteBoardInputType, DeleteBoardReturnType } from './types'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const handler = async (data: DeleteBoardInputType): Promise<DeleteBoardReturnType> => {
  const { orgId, userId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    }
  }

  const { id } = data
  let board

  try {
    board = await db.board.delete({
      where: {
        id,
        orgId,
      },
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
