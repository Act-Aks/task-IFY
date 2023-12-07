import { HelpCircle, User2 } from 'lucide-react'

import { FormPopover } from '@/components/Form/FormPopover'
import { Hint } from '@/components/ui/hint'

export const BoardList = () => {
  return (
    <div className='space-y-2'>
      <div className='flex items-center font-semibold text-lg text-neutral-700'>
        <User2 className='h-6 w-6 mr-2' />
        Your Boards
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
        <div className='aspect-video relative h-full w-full rounded-sm flex items-center justify-center'>
          <FormPopover sideOffset={100} side='right'>
            <div
              role='button'
              className='aspect-video absolute top-0 left-0 h-full w-full bg-gradient-to-r from-fuchsia-600/10 to-violet-600/10 rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition overflow-auto'>
              <p className='text-sm'> Create new board</p>
              <span className='text-xs'>5 remaining</span>
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
