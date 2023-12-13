import { Suspense } from 'react'

import { Separator } from '@/components/ui/separator'
import { checkSubscription } from '@/lib/subscription'

import { BoardList } from './_components/BoardList'
import { Info } from './_components/Info'

export default async function OrganizationIdPage() {
  const isPro = await checkSubscription()

  return (
    <div className='w-full mb-20'>
      <Info isPro={isPro} />
      <Separator className='my-4' />
      <div className='px-2 md:px-4'>
        <Suspense fallback={<BoardList.Skeleton />}>
          <BoardList />
        </Suspense>
      </div>
    </div>
  )
}
