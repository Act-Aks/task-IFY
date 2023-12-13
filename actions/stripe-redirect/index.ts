'use server'

import { CreateSafeAction } from '@/lib/createSafeAction'
import { db } from '@/lib/db'
import { stripe } from '@/lib/stripe'
import { absoluteUrl, generateRoute } from '@/lib/utils'

import { StripeRedirect } from './schema'
import { StripeRedirectInputType, StripeRedirectReturnType } from './types'
import { auth, currentUser } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

const handler = async (data: StripeRedirectInputType): Promise<StripeRedirectReturnType> => {
  const { orgId, userId } = auth()
  const user = await currentUser()

  if (!userId || !orgId || !user) {
    return {
      error: 'Unauthorized',
    }
  }

  const settingsUrl = absoluteUrl(generateRoute('organization', { id: orgId }))

  let url = ''

  try {
    const organizationSubscription = await db.orgSubscription.findUnique({
      where: {
        orgId,
      },
    })

    if (organizationSubscription && organizationSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: organizationSubscription.stripeCustomerId,
        return_url: settingsUrl,
      })

      url = stripeSession.url
    } else {
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: settingsUrl,
        cancel_url: settingsUrl,
        payment_method_types: ['card'],
        mode: 'subscription',
        billing_address_collection: 'auto',
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [
          {
            price_data: {
              currency: 'USD',
              product_data: {
                name: 'Task-IFY Pro',
                description: 'Unlimited boards for your organization',
              },
              unit_amount: 2000,
              recurring: {
                interval: 'month',
              },
            },
            quantity: 1,
          },
        ],
        metadata: {
          orgId,
        },
      })

      url = stripeSession.url || ''
    }
  } catch {
    return {
      error: 'Something went wrong. Please try again later.',
    }
  }

  revalidatePath(generateRoute('organization', { id: orgId }))

  return { data: url }
}

export const stripeRedirect = CreateSafeAction(StripeRedirect, handler)
