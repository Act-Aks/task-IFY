import { TypeOf } from 'zod'

import { ActionState } from '@/lib/createSafeAction'

import { CopyList } from './schema'
import { List } from '@prisma/client'

export type CopyListInputType = TypeOf<typeof CopyList>
export type CopyListReturnType = ActionState<CopyListInputType, List>
