import { startCase } from 'lodash'

import { OrganizationControl } from './_components/OrganizationControl'
import { auth } from '@clerk/nextjs'

export async function generateMetadata() {
  const { orgSlug } = auth()

  return {
    title: startCase(orgSlug || 'organization'),
  }
}

export default function OrganizationIdLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <OrganizationControl />
      {children}
    </>
  )
}
