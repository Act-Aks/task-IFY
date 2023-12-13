'use client'

import { toast } from 'sonner'

import { stripeRedirect } from '@/actions/stripe-redirect'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useAction } from '@/hooks/useAction'
import { useProModal } from '@/hooks/useProModal'

import Image from 'next/image'

export const ProModal = () => {
  const proModal = useProModal()

  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess(data) {
      window.location.href = data
    },
    onError(error) {
      toast.error(error)
    },
  })

  const onClick = () => {
    execute({})
  }

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent className='max-w-md p-0 overflow-hidden'>
        <div className='aspect-video relative flex items-center justify-center'>
          <Image src={'/hero.svg'} alt='Hero' fill className='object-cover' />
        </div>
        <div className='text-neutral-700 mx-auto space-y-6 p-6'>
          <h2 className='font-semibold text-xl'>Upgrade to Task-IFY Pro now!</h2>
          <p className='text-xs font-semibold text-neutral-600'>
            Explore all the features of Task-IFY
          </p>
          <div className='pl-3'>
            <ul className='text-sm list-disc'>
              <li>Unlimited boards</li>
              <li>Advanced checklists</li>
              <li>Security and admin features</li>
              <li>And more cool features!</li>
            </ul>
          </div>
          <Button
            className='w-full'
            variant={'primary-gradient'}
            disabled={isLoading}
            onClick={onClick}>
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
