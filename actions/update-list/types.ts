import { TypeOf } from 'zod'

import { ActionState } from '@/lib/createSafeAction'

import { UpdateList } from './schema'
import { List } from '@prisma/client'

export type UpdateListInputType = TypeOf<typeof UpdateList>
export type UpdateListReturnType = ActionState<UpdateListInputType, List>
