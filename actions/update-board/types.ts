import { TypeOf } from 'zod'

import { ActionState } from '@/lib/createSafeAction'

import { UpdateBoard } from './schema'
import { Board } from '@prisma/client'

export type UpdateBoardInputType = TypeOf<typeof UpdateBoard>
export type UpdateBoardReturnType = ActionState<UpdateBoardInputType, Board>
