import { TypeOf } from 'zod'

import { ActionState } from '@/lib/createSafeAction'

import { DeleteBoard } from './schema'
import { Board } from '@prisma/client'

export type DeleteBoardInputType = TypeOf<typeof DeleteBoard>
export type DeleteBoardReturnType = ActionState<DeleteBoardInputType, Board>
