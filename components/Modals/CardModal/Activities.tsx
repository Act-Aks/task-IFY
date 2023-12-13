'use client'

import { ActivityIcon } from 'lucide-react'

import { ActivityItem } from '@/components/ActivityItem'
import { Skeleton } from '@/components/ui/skeleton'

import { AuditLog } from '@prisma/client'

interface ActivitiesProps {
  items: AuditLog[]
}

export const Activities = ({ items }: ActivitiesProps) => {
  return (
    <div className='flex items-start gap-x-3 w-full'>
      <ActivityIcon className='h-5 w-5 mt-0.5 text-neutral-700' />
      <div className='w-full'>
        <p className='font-semibold text-neutral-700 mb-2'>Activity</p>

        <ol className='mt-2 space-y-4'>
          {items.map(item => (
            <ActivityItem logData={item} key={item.id} />
          ))}
        </ol>
      </div>
    </div>
  )
}

Activities.Skeleton = function ActivitiesSkeleton() {
  return (
    <div className='flex items-start gap-x-3 w-full'>
      <Skeleton className='bg-neutral-200 h-6 w-6' />
      <div className='w-full'>
        <Skeleton className='h-6 w-24 mb-2 bg-neutral-200' />
        <Skeleton className='w-full h-10 bg-neutral-200' />
      </div>
    </div>
  )
}
