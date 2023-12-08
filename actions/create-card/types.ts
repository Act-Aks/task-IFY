import { TypeOf } from 'zod'

import { ActionState } from '@/lib/createSafeAction'

import { CreateCard } from './schema'
import { Card } from '@prisma/client'

export type CreateCardInputType = TypeOf<typeof CreateCard>
export type CreateCardReturnType = ActionState<CreateCardInputType, Card>
