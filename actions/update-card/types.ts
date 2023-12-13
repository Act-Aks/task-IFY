import { TypeOf } from 'zod'

import { ActionState } from '@/lib/createSafeAction'

import { UpdateCard } from './schema'
import { Card } from '@prisma/client'

export type UpdateCardInputType = TypeOf<typeof UpdateCard>
export type UpdateCardReturnType = ActionState<UpdateCardInputType, Card>
