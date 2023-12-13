import { TypeOf } from 'zod'

import { ActionState } from '@/lib/createSafeAction'

import { StripeRedirect } from './schema'

export type StripeRedirectInputType = TypeOf<typeof StripeRedirect>
export type StripeRedirectReturnType = ActionState<StripeRedirectInputType, string>
