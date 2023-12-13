import { TypeOf } from 'zod'

import { ActionState } from '@/lib/createSafeAction'

import { UpdateCardOrder } from './schema'
import { Card } from '@prisma/client'

export type UpdateCardOrderInputType = TypeOf<typeof UpdateCardOrder>
export type UpdateCardOrderReturnType = ActionState<UpdateCardOrderInputType, Card[]>
