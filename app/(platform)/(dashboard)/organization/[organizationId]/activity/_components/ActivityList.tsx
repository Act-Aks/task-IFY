import { fetchAuditLogs } from '@/actions/fetch-auditLogs'
import { ActivityItem } from '@/components/ActivityItem'
import { Skeleton } from '@/components/ui/skeleton'
import { db } from '@/lib/db'
import { generateRoute } from '@/lib/utils'

import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export const ActivityList = async () => {
  const { orgId } = auth()

  if (!orgId) {
    return redirect(generateRoute('selectOrg'))
  }

  const auditLogs = await fetchAuditLogs(orgId)

  return (
    <ol className='space-y-4 mt-4'>
      <p className='hidden last:block text-xs text-center text-muted-foreground'>
        No activity found in this organization
      </p>
      {auditLogs.map(log => (
        <ActivityItem key={log.id} logData={log} />
      ))}
    </ol>
  )
}

ActivityList.Skeleton = function ActivityListSkeleton() {
  return (
    <ol className='space-y-4 mt-4'>
      <Skeleton className='w-[80%] h-14' />
      <Skeleton className='w-[50%] h-14' />
      <Skeleton className='w-[70%] h-14' />
      <Skeleton className='w-[80%] h-14' />
      <Skeleton className='w-[75%] h-14' />
    </ol>
  )
}
