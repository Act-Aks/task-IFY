import { db } from '@/lib/db'

import { auth, currentUser } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'

interface Props {
  entityId: string
  entityType: ENTITY_TYPE
  entityTitle: string
  action: ACTION
}

export const createAuditLog = async ({ entityId, entityType, entityTitle, action }: Props) => {
  try {
    const { orgId } = auth()
    const user = await currentUser()

    if (!orgId || !user) {
      throw new Error('User not found')
    }

    await db.auditLog.create({
      data: {
        orgId,
        entityId,
        entityType,
        entityTitle,
        action,
        userId: user.id,
        userImage: user.imageUrl,
        userName: user.firstName + ' ' + user.lastName,
      },
    })
  } catch (error) {
    console.log('[AUDIT_LOG_ERROR]', error)
  }
}
