import { db } from '@/lib/db'

import { auth } from '@clerk/nextjs'

const DAY_IN_MS = 86_400_000

export const checkSubscription = async () => {
  const { orgId } = auth()

  if (!orgId) {
    return false
  }

  const subscription = await db.orgSubscription.findUnique({
    where: { orgId },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  })

  if (!subscription) {
    return false
  }

  const isValid =
    subscription.stripePriceId &&
    subscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()

  return !!isValid
}