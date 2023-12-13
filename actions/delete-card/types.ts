import { TypeOf } from 'zod'

import { ActionState } from '@/lib/createSafeAction'

import { DeleteCard } from './schema'
import { Card } from '@prisma/client'

export type DeleteCardInputType = TypeOf<typeof DeleteCard>
export type DeleteCardReturnType = ActionState<DeleteCardInputType, Card>
