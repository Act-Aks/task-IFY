import { TypeOf } from 'zod'

import { ActionState } from '@/lib/createSafeAction'

import { UpdateListOrder } from './schema'
import { List } from '@prisma/client'

export type UpdateListOrderInputType = TypeOf<typeof UpdateListOrder>
export type UpdateListOrderReturnType = ActionState<UpdateListOrderInputType, List[]>
