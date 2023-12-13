'use client'

import { CreditCard } from 'lucide-react'

import { Skeleton } from '@/components/ui/skeleton'

import { useOrganization } from '@clerk/nextjs'
import Image from 'next/image'

interface InfoProps {
  isPro: boolean
}

export const Info = ({ isPro }: InfoProps) => {
  const { organization, isLoaded } = useOrganization()

  if (!isLoaded) {
    return <Info.Skeleton />
  }

  return (
    <div className='flex items-center gap-x-4'>
      <div className='w-[60px] h-[60px] relative'>
        <Image
          fill
          src={organization?.imageUrl!}
          alt='Organization'
          className='rounded-md object-cover'
        />
      </div>

      <div className='space-y-1'>
        <p className='font-semibold text-xl'>{organization?.name}</p>
        <div className='flex items-center text-xs text-muted-foreground'>
          <CreditCard className='w-3 h-3 mr-1' />
          {isPro ? 'Pro' : 'Free'}
        </div>
      </div>
    </div>
  )
}

Info.Skeleton = function InfoSkeleton() {
  return (
    <div className='flex items-center gap-x-4'>
      <div className='w-[60px] h-[60px] relative'>
        <Skeleton className='w-full h-full absolute' />
      </div>
      <div className='space-y-2'>
        <Skeleton className='w-[200px] h-10' />
        <div className='flex items-center'>
          <Skeleton className='h-4 w-4' />
          <Skeleton className='h-4 w-[100px]' />
        </div>
      </div>
    </div>
  )
}
