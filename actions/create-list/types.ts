import { TypeOf } from 'zod'

import { ActionState } from '@/lib/createSafeAction'

import { CreateList } from './schema'
import { List } from '@prisma/client'

export type CreateListInputType = TypeOf<typeof CreateList>
export type CreateListReturnType = ActionState<CreateListInputType, List>
