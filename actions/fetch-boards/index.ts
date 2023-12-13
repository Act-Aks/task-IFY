'use server'

import { db } from '@/lib/db'

import { notFound } from 'next/navigation'

export const fetchBoards = async (orgId: string) => {
  const boards = await db.board.findMany({
    where: {
      orgId: orgId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return boards
}

export const fetchBoardById = async (orgId: string, boardId: string) => {
  const board = await db.board.findUnique({
    where: {
      id: boardId,
      orgId,
    },
  })

  if (!board) {
    notFound()
  }

  return board
}
