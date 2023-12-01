import { TypeOf } from 'zod'

import { ActionState } from '@/lib/createSafeAction'

import { CreateBoard } from './schema'
import { Board } from '@prisma/client'

export type CreateBoardInputType = TypeOf<typeof CreateBoard>
export type CreateBoardReturnType = ActionState<CreateBoardInputType, Board>
