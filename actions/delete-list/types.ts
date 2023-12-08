import { TypeOf } from 'zod'

import { ActionState } from '@/lib/createSafeAction'

import { DeleteList } from './schema'
import { List } from '@prisma/client'

export type DeleteListInputType = TypeOf<typeof DeleteList>
export type DeleteListReturnType = ActionState<DeleteListInputType, List>
