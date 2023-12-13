import { HelpCircle, User2 } from 'lucide-react'

import { fetchBoards } from '@/actions/fetch-boards'
import { FormPopover } from '@/components/Form/FormPopover'
import { Hint } from '@/components/ui/hint'
import { Skeleton } from '@/components/ui/skeleton'
import { MAX_FREE_BOARDS } from '@/constants/boards'
import { getAvailableCount } from '@/lib/organizationLimit'
import { checkSubscription } from '@/lib/subscription'
import { generateRoute } from '@/lib/utils'

import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export const BoardList = async () => {
  const { orgId } = auth()

  if (!orgId) {
    return redirect(generateRoute('selectOrg'))
  }

  const boards = await fetchBoards(orgId)
  const availableCount = await getAvailableCount()
  const isPro = await checkSubscription()

  return (
    <div className='space-y-2'>
      <div className='flex items-center font-semibold text-lg text-neutral-700'>
        <User2 className='h-6 w-6 mr-2' />
        Your Boards
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
        {boards.map(board => (
          <Link
            key={board.id}
            href={generateRoute('board', { id: board.id })}
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
            className='group relative aspect-video bg-no-repeat bg-center bg-cover bg-violet-700 rounded-sm h-full w-full p-2 overflow-hidden'>
            <div className='absolute inset-0 bg-black/30 group-hover:bg-black/40 transition'>
              <p className='text-white font-semibold relative p-2'>{board.title}</p>
            </div>
          </Link>
        ))}
        <div className='aspect-video relative h-full w-full rounded-sm flex items-center justify-center'>
          <FormPopover sideOffset={100} side='right'>
            <div
              role='button'
              className='aspect-video absolute top-0 left-0 h-full w-full bg-gradient-to-r from-fuchsia-600/10 to-violet-600/10 rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition overflow-auto'>
              <p className='text-sm'> Create new board</p>
              <span className='text-xs'>
                {isPro ? 'Unlimited' : `${MAX_FREE_BOARDS - availableCount} remaining`}
              </span>
            </div>
          </FormPopover>
          <Hint
            sideOffset={60}
            description={`Free Workspaces can have up to 5 boards. For unlimited boards, upgrade this workspace.`}>
            <HelpCircle className='absolute bottom-2 right-2 h-[14px] w-[14px]' />
          </Hint>
        </div>
      </div>
    </div>
  )
}

BoardList.Skeleton = function BoardListSkeleton() {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
      <Skeleton className='w-full h-full aspect-video p-2' />
      <Skeleton className='w-full h-full aspect-video p-2' />
      <Skeleton className='w-full h-full aspect-video p-2' />
      <Skeleton className='w-full h-full aspect-video p-2' />
      <Skeleton className='w-full h-full aspect-video p-2' />
      <Skeleton className='w-full h-full aspect-video p-2' />
      <Skeleton className='w-full h-full aspect-video p-2' />
      <Skeleton className='w-full h-full aspect-video p-2' />
    </div>
  )
}
