'use client'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip'

interface HintProps {
  description: string
  side?: 'top' | 'bottom' | 'left' | 'right'
  sideOffset?: number
  children: React.ReactNode
}

export const Hint = ({ description, side = 'bottom', sideOffset = 4, children }: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          sideOffset={sideOffset}
          className='text-xs max-w-[220px] break-words lg:mt-2'>
          {description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
