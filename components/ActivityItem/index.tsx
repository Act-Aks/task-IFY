import { format } from 'date-fns'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { generateLogMessage } from '@/lib/generateLogMessage'

import { AuditLog } from '@prisma/client'

interface ActivityItemProps {
  logData: AuditLog
}

export const ActivityItem = ({ logData }: ActivityItemProps) => {
  return (
    <li className='flex items-center gap-x-2'>
      <Avatar className='h-8 w-8'>
        <AvatarImage src={logData.userImage} />
      </Avatar>
      <div className='flex flex-col space-y-0.5'>
        <p className='text-sm text-muted-foreground'>
          <span className='font-semibold lowercase text-neutral-700'>{logData.userName}</span>
          {generateLogMessage(logData)}
        </p>
        <p className='text-xs text-muted-foreground'>
          {format(new Date(logData.createdAt), "MMM d, yyyy 'at' h:mm a")}
        </p>
      </div>
    </li>
  )
}
