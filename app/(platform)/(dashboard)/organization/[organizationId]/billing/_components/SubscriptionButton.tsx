'use client'

import { toast } from 'sonner'

import { stripeRedirect } from '@/actions/stripe-redirect'
import { Button } from '@/components/ui/button'
import { useAction } from '@/hooks/useAction'
import { useProModal } from '@/hooks/useProModal'

interface SubscriptionButtonProps {
  isPro: boolean
}

export const SubscriptionButton = ({ isPro }: SubscriptionButtonProps) => {
  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess(data) {
      window.location.href = data
    },
    onError(error) {
      toast.error(error)
    },
  })

  const proModal = useProModal()

  const onClick = () => {
    if (isPro) {
      execute({})
    } else {
      proModal.onOpen()
    }
  }

  return (
    <Button onClick={onClick} disabled={isLoading} variant={'primary-gradient'}>
      {isPro ? 'Manage Subscription' : 'Upgrade to Pro'}
    </Button>
  )
}
