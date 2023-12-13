import { TypeOf } from 'zod'

import { ActionState } from '@/lib/createSafeAction'

import { CopyCard } from './schema'
import { Card } from '@prisma/client'

export type CopyCardInputType = TypeOf<typeof CopyCard>
export type CopyCardReturnType = ActionState<CopyCardInputType, Card>
