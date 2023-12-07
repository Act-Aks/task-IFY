'use server'

import { db } from '@/lib/db'

export const fetchLists = async (orgId: string, boardId: string) => {
  const lists = await db.list.findMany({
    where: {
      boardId: boardId,
      board: {
        orgId: orgId,
      },
    },
    include: {
      cards: {
        orderBy: {
          order: 'asc',
        },
      },
    },
    orderBy: {
      order: 'asc',
    },
  })

  return { lists }
}
