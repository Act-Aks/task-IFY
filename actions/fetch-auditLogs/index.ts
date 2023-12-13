'use server'

import { db } from '@/lib/db'

export const fetchAuditLogs = async (orgId: string) => {
  const auditLogs = await db.auditLog.findMany({
    where: { orgId },
    orderBy: { createdAt: 'desc' },
  })

  return auditLogs
}
